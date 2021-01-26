import { NextSeo } from 'next-seo';
import db from '../../../db.json';
import background from '../../../assets/background.jpg'

const Page = () => (
  <>
    <NextSeo
      title="Sidekick Quiz"
      description="Quiz do ajudante de herói."
      openGraph={{
        url: "https://sidekickquiz.vercel.app/",
        title: 'Sidekick Quiz',
        description: 'Quiz do ajudante de herói.',
        images: [
          {
            url: `${background}`,
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