import React, { useState } from 'react';
import db from '../db.json';
import Widget from '../src/components/Widget';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import QuizBackground from '../src/components/QuizBackground';
import QuizContainer from '../src/components/QuizContainer';
import QuizLogo from '../src/components/QuizLogo';
import Head from '../src/components/Head';
import Input from '../src/components/Input';
import Button from '../src/components/Button';
import { useRouter } from 'next/router';
import Link from '../src/components/Link';
import { motion } from 'framer-motion'


export default function Home() {
  const router = useRouter();
  const [name, setName] = useState('');
  return (
    <>
      <Head title={db.title} description={db.description} bg={db.bg} icon={db.icon} />
      <QuizBackground backgroundImage={db.bg}>
        <QuizContainer>
          <QuizLogo />
          <Widget
          as={motion.section}
          transition={{
            delay: 0,
            duration: 0.8
          }}
          variants={{
            show: {opacity: 1, y: '0'},
            hidden: { opacity: 0, y: '100%' },
          }}
          initial="hidden"
          animate="show"
          >
            <Widget.Header>
              <h1>{db.title}</h1>
            </Widget.Header>
            <Widget.Content>
              <p>{db.description}</p>
              <form onSubmit={function (event) {
                event.preventDefault();
                router.push(`/quiz?name=${name}`);
              }} >
                <Input
                  onChange={function (event) {
                    setName(event.target.value);
                  }}
                  placeholder="Qual o seu nome de herói?"
                  name="name"
                  value={name}
                />

                <Button type="submit" disabled={name.length === 0}>{`Jogar ${name}`}</Button>
              </form>
            </Widget.Content>
          </Widget>
          <Widget
          as={motion.section}
          transition={{
            delay: 0.5,
            duration: 0.8
          }}
          variants={{
            show: {opacity: 1, y: '0'},
            hidden: { opacity: 0, y: '100%' },
          }}
          initial="hidden"
          animate="show"
          >
            <Widget.Content>
              <h1>Quizes da galera</h1>
              <ul>
                
                {db.external.map((linkExterno) => {
                  const [projectName, user] = linkExterno
                  .replace(/\//g, '')
                  .replace('https:', '')
                  .replace('.vercel.app', '')
                  .split('.');
                  return (
                    <li key={user}>
                      <Widget.Topic as={Link} href={`/quiz/${projectName}___${user}`}>
                        {`${user}/${projectName}`}
                      </Widget.Topic>
                    </li>
                  )
                })}
              </ul>
            </Widget.Content>
          </Widget>
          <Footer />
        </QuizContainer>
        <GitHubCorner projectUrl="https://github.com/Louissilver/aluraquiz" />
      </QuizBackground>
    </>
  );
}
