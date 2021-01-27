import React, { useState, useEffect } from 'react';
import db from '../db.json';
import Widget from '../src/components/Widget';
import QuizLogo from '../src/components/QuizLogo';
import QuizBackground from '../src/components/QuizBackground';
import QuizContainer from '../src/components/QuizContainer';
import Button from '../src/components/Button';
import { useRouter } from 'next/router';
import Head from '../src/components/Head';
import Spinner from 'react-bootstrap/Spinner'
import 'bootstrap/dist/css/bootstrap.min.css';

function LoadingWidget() {
  return (
    <Widget>
      <Widget.Header>
        Carregando...
      </Widget.Header>

      <Widget.Content>
        <Spinner animation="border" role="status" />
      </Widget.Content>
    </Widget>
  );
}

function QuestionWidget({ question, questionIndex, totalQuestions, onSubmit, }) {
  const questionId = `question__${questionIndex}`;
  const [answer, setAnswer] = useState(0);
  return (
    <Widget >
      <Widget.Header>
        <h3>{`Pergunta ${questionIndex + 1} de ${totalQuestions}`}</h3>
      </Widget.Header>

      <img alt="Descrição" style={{ width: '100%', height: '180px', objectFit: 'cover', }} src={question.image} />

      <Widget.Content>
        <h2>{question.title}</h2>
        <p>{question.description}</p>

        <form
          onSubmit={(infosDoEvento) => {
            infosDoEvento.preventDefault();
            onSubmit(answer);
          }}
        >
          {question.alternatives.map((alternative, alternativeIndex) => {
            const alternativeId = `alternative__${alternativeIndex}`;
            return (
              <Widget.Topic
                as="label"
                htmlFor={alternativeId}
                key={alternativeId}
              >
                <input
                  id={alternativeId}
                  name={questionId}
                  type="radio"
                  key={alternativeIndex}
                  onChange={(event) => {
                    setAnswer(Number(event.target.dataset.alternativeIndex));
                  }}
                  data-alternative-index={alternativeIndex}
                />
                {alternative}
              </Widget.Topic>
            );
          })}

          <Button type="submit">Confirmar</Button>
        </form>
      </Widget.Content>
    </Widget>
  );
}

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
};

export default function QuizPage() {
  const [screenState, setScreenState] = useState(screenStates.LOADING);
  const totalQuestions = db.questions.length;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const questionIndex = currentQuestion;
  const question = db.questions[questionIndex];
  const router = useRouter();
 const [respostasCorretas, setRespostasCorretas] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 1 * 1000);
  }, []);

  function handleSubmitQuiz(answer) {
    if (answer === question.answer) {
      setRespostasCorretas(r => r+=1);
      alert('Parabéns! Você acertou!');
    }
    const nextQuestion = questionIndex + 1;
    if (nextQuestion < totalQuestions) {
      setCurrentQuestion(nextQuestion);
    } else {
      setScreenState(screenStates.RESULT);
    }
  }

  return (
    <>
      <Head title={db.title} description={db.description} bg={db.bg} icon={db.icon} />
      <QuizBackground backgroundImage={db.bg}>
        <QuizContainer>
          <QuizLogo />
          {screenState === screenStates.QUIZ && (
            <QuestionWidget
              question={question}
              questionIndex={questionIndex}
              totalQuestions={totalQuestions}
              onSubmit={handleSubmitQuiz}
            />
          )}

          {screenState === screenStates.LOADING && <LoadingWidget />}

          {screenState === screenStates.RESULT && (
            < Widget >
              <Widget.Header>Você acertou {respostasCorretas} questões, parabéns!</Widget.Header>
              <Widget.Content>
                <form onSubmit={function (event) {
                  event.preventDefault();
                  setRespostasCorretas(0);
                  router.push('/');
                }} >
                  <Button type="submit">Voltar</Button>
                </form>
              </Widget.Content>
            </Widget>)}
        </QuizContainer>
      </QuizBackground>
    </>
  );
}
