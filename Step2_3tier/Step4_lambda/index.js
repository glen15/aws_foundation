const OpenAI = require('openai');
const mysql = require('mysql');

exports.handler = async (event) => {
    console.log("EC2 -> Lambda로 전달된 데이터", event.body)
    // 환경 변수에서 OpenAI API 키와 데이터베이스 연결 정보를 불러옵니다.
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    let inputData;
    try {
        inputData = JSON.parse(event.body);
    } catch (error) {
        console.error('JSON 파싱 오류:', error);
        return { statusCode: 400, body: 'Invalid JSON format' };
    }

    if (!inputData || !inputData.content) {
        console.error('Invalid request: No content provided');
        return { statusCode: 400, body: 'No content provided' };
    }
    
    const userMessage = inputData.content;
    console.log("ai한테 보낼 유저 메시지 내용", inputData.content, typeof inputData.content)
    
    try {
        // OpenAI API 호출
        const completion = await openai.chat.completions.create({
            messages: [
                { role: "system", content: "Your are expert in AWS, Tell me one AWS service names that I can learn additionally based on the data sent by the user.  in Korean" },
                // { role: "system", content: "Your are expert in AWS, Tell me one AWS service names that I can learn additionally based on the data sent by the user. as one sentence in Korean" },
                { role: "user", content: userMessage }
            ],
            model: "gpt-3.5-turbo",
            max_tokens: 1000,
        });

        const aiResponse = completion.choices[0].message.content;
        console.log("ai 한테 받아왔어?", aiResponse)

        // 데이터베이스에 AI 응답 저장
        const dbConfig = {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PW,
            database: process.env.DB_NAME
        };
        const db = mysql.createConnection(dbConfig);
        db.connect();

        const sql = 'UPDATE notes SET ai_note = ? WHERE user_note = ?';
        const values = [aiResponse, userMessage];
        await new Promise((resolve, reject) => {
            db.query(sql, values, (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        });

        db.end();

        return aiResponse;
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Lambda function error');
    }
};
