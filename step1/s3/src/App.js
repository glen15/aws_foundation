import React from 'react';
import { ChakraProvider, extendTheme, Box, Text, VStack, Link, Container, Flex, useBreakpointValue } from '@chakra-ui/react';
import { Bar, Doughnut, Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  DoughnutController,
  PieController,
  ArcElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  DoughnutController,
  PieController,
  ArcElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


// 테마 설정
const theme = extendTheme({
  colors: {
    brand: {
      100: "#f7fafc",
      500: "#50b3a2",
      700: "#2c7a7b",
      900: "#234e52",
    },
  },
  fonts: {
    heading: "Arial, sans-serif",
    body: "Arial, sans-serif",
  },
});

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <Box bg="brand.100" color="brand.900" fontFamily="body">
        <Container maxW="container.xl" py={5}>
          <Header />
          <Showcase />
          <TopSections />
          <SkillsSection />
          <ContactSection />
        </Container>
      </Box>
    </ChakraProvider>
  );
};

const Header = () => (
  <Box bg="brand.500" color="white" py="4" textAlign="center">
    <Text fontSize="xl" fontWeight="bold">대학생 데브옵스 엔지니어 이력서</Text>
  </Box>
);

const Showcase = () => (
  <Box bg="brand.700" color="white" py="8" textAlign="center">
    <Text fontSize="5xl">홍길동</Text>
    <Text fontSize="2xl">데브옵스 엔지니어링에 대한 열정을 가진 대학생</Text>
  </Box>
);

const TopSections = () => {
  const stackDirection = useBreakpointValue({ base: 'column', md: 'row' });

  return (
    <Flex direction={stackDirection} justify="space-between" wrap="wrap" my={5}>
      <Box flex="1" minW={{ md: "30%" }} p={2}>
        <About />
      </Box>
      <Box flex="1" minW={{ md: "30%" }} p={2}>
        <Education />
      </Box>
      <Box flex="1" minW={{ md: "30%" }} p={2}>
        <Projects />
      </Box>
    </Flex>
  );
};

const SkillsSection = () => {
  const stackDirection = useBreakpointValue({ base: 'column', md: 'row' });
  const justifyContent = useBreakpointValue({ base: 'center', md: 'space-around' });

  return (
    <Flex direction={stackDirection} justify={justifyContent} wrap="wrap" my={5}>
      <Box flex="1" minW={{ base: "80%", md: "30%" }} p={2}>
        <SkillsChart />
      </Box>
      <Box flex="1" minW={{ base: "80%", md: "30%" }} p={2}>
        <LearningProgressChart />
      </Box>
      <Box flex="1" minW={{ base: "80%", md: "30%" }} p={2}>
        <ProjectContributionChart />
      </Box>
    </Flex>
  );
};


const ContactSection = () => {
  return (
    <Box width="100%" p={2}>
      <Contact />
    </Box>
  );
};

// About 컴포넌트
const About = () => (
  <VStack align="start" p={4} bg="gray.100" borderRadius="md">
    <Text fontSize="2xl" fontWeight="semibold">소개</Text>
    <Text>저는 ~대학교에서 컴퓨터 과학을 전공하고 있으며, 데브옵스 분야에 큰 관심을 가지고 있습니다. 클라우드 인프라, 자동화, CI/CD에 대한 지식을 갖추고 있으며, 이를 프로젝트에 적용하는 데 열정적입니다.</Text>
  </VStack>
);

// Education 컴포넌트
const Education = () => (
  <VStack align="start" p={4} bg="gray.100" borderRadius="md">
    <Text fontSize="2xl" fontWeight="semibold">교육</Text>
    <Text>~대학교 컴퓨터 과학과 | 예상 졸업년도: 20XX년</Text>
  </VStack>
);

// Projects 컴포넌트
const Projects = () => (
  <VStack align="start" p={4} bg="gray.100" borderRadius="md">
    <Text fontSize="2xl" fontWeight="semibold">프로젝트 경험</Text>
    <Text>다양한 학교 프로젝트에 참여했으며, 특히 AWS를 사용한 웹 애플리케이션 배포와 GitHub Actions를 통한 CI/CD 파이프라인 구축에 관심을 가지고 있습니다.</Text>
  </VStack>
);

// Contact 컴포넌트
const Contact = () => (
  <VStack align="start" p={4} bg="gray.100" borderRadius="md">
    <Text fontSize="2xl" fontWeight="semibold">연락처</Text>
    <Link href="mailto:example@example.com" color="blue.500">example@example.com</Link>
    <Text>Phone: 010-1234-5678</Text>
    <Link href="https://github.com//yourgithubid" isExternal color="blue.500">Github: yourid</Link>
    <Link href="https://linkedin.com/in/yourprofile" isExternal color="blue.500">LinkedIn: yourprofile</Link>
  </VStack>
);

const SkillsChart = () => {
  const data = {
    labels: ['AWS', 'Docker', 'CI/CD', 'Python'],
    datasets: [
      {
        label: '기술 숙련도',
        data: [75, 65, 80, 90],
        backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)'],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      title: {
        display: true,
        text: '기술 숙련도',
      },
    },
  };

  return <Bar data={data} options={options} />;
};

const LearningProgressChart = () => {
  const data = {
    labels: ['완료: GitActions 및 CodePipeline을 이용한 CI/CD', '진행 중: 컨테이너 오케스트레이션, 서버리스, 모니터링', '시작 안 함: 세부 보안 네트워크 구성 및 모니터링'],
    datasets: [
      {
        data: [30, 50, 20],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  const options = {
    plugins: {
      title: {
        display: true,
        text: '학습 진행 상황',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed !== null) {
              label += context.parsed + '%';
            }
            return label;
          }
        }
      }
    },
    hover: {
      mode: 'index',
      intersect: false,
      onHover: function(event, elements) {
        event.native.target.style.cursor = elements.length ? 'pointer' : 'default';
      }
    },
    elements: {
      arc: {
        hoverOffset: 100 // 호버 시 차트 요소 확대
      }
    }
  };

  return <Doughnut data={data} options={options} />;
};

const ProjectContributionChart = () => {
  const data = {
    labels: ['백엔드 개발', '프론트엔드 개발', '데이터베이스 관리', '테스팅'],
    datasets: [
      {
        data: [40, 30, 15, 15],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
      },
    ],
  };

  const options = {
    plugins: {
      title: {
        display: true,
        text: '프로젝트 기여',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed !== null) {
              label += context.parsed + '%';
            }
            return label;
          }
        }
      }
    },
    hover: {
      mode: 'index',
      intersect: false,
      onHover: function(event, elements) {
        event.native.target.style.cursor = elements.length ? 'pointer' : 'default';
      }
    },
    elements: {
      arc: {
        hoverOffset: 100 // 호버 시 차트 요소 확대
      }
    }
  };
    

  return <Pie data={data} options={options} />;
};
export default App;
