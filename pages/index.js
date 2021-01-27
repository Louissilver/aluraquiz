import React, { useState } from 'react';
import styled from 'styled-components';
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


export default function Home() {
  const router = useRouter();
  const [name, setName] = useState('');
  return (
    <>
      <Head title={db.title} description={db.description} bg={db.bg} icon={db.icon} />
      <QuizBackground backgroundImage={db.bg}>
        <QuizContainer>
          <QuizLogo />
          <Widget>
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
          <Widget>
            <Widget.Content>
              <h1>Quizes da galera</h1>
              <p>Bora testar seu conhecimento em outras áreas?!</p>
            </Widget.Content>
          </Widget>
          <Footer />
        </QuizContainer>
        <GitHubCorner projectUrl="https://github.com/Louissilver/aluraquiz" />
      </QuizBackground>
    </>
  );
}
