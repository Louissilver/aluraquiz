import { NextSeo } from 'next-seo';
import db from '../../../db.json';

const Page = () => (
  <>
    <NextSeo
      title="Sidekick Quiz"
      description="Quiz do ajudante de herói."
      canonical="https://sidekickquiz.vercel.app/"
      openGraph={{
        url: `${db.bg}`,
        title: 'Sidekick Quiz',
        description: 'Quiz do ajudante de herói.',
        images: [
          {
            url: 'https://www.example.ie/og-image-01.jpg',
            width: 800,
            height: 600,
          },
        ],
        site_name: 'SidekickQuiz',
      }}
    />
  </>
);

export default Page;