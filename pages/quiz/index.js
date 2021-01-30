import React, { useState, useEffect, useReducer } from 'react';
import db from '../../db.json';
import Widget from '../../src/components/Widget';
import QuizLogo from '../../src/components/QuizLogo';
import QuizBackground from '../../src/components/QuizBackground';
import QuizContainer from '../../src/components/QuizContainer';
import AlternativesForm from '../../src/components/AlternativesForm';
import Button from '../../src/components/Button';
import { useRouter } from 'next/router';
import Head from '../../src/components/Head';
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


function ResultWidget({ results, totalQuestions, router }) {
  return (
    < Widget >
      <Widget.Header>Você acertou {results.reduce((somatorioAtual, resultAtual) => {
        const isAcerto = resultAtual === true;
        if (isAcerto) {
          return somatorioAtual + 1;
        }
        return somatorioAtual;
      }, 0)}
        {' '}questões de {totalQuestions}, parabéns!</Widget.Header>
      <Widget.Content>
        <ul>
          {results.map((result, index) => (
            <li key={`result__${index}`}>
              #{index + 1} Resultado:
              {result === true
                ? ' Acertou!'
                : ' Errou!'}
            </li>
          ))}
        </ul>
      </Widget.Content>

      <Widget.Content>
        <form onSubmit={function (event) {
          event.preventDefault();
          router.push('/');
        }} >
          <Button type="submit">Voltar</Button>
        </form>
      </Widget.Content>
    </Widget>)
}



function QuestionWidget({ question, questionIndex, totalQuestions, onSubmit, addResult }) {
  const questionId = `question__${questionIndex}`;
  const [isQuestionSubmited, setIsQuestionSubmited] = useState(false);
  const [answer, setAnswer] = useState(undefined);
  const isCorrect = answer === question.answer;
  const hasAlternativeSelected = answer !== undefined;
  return (
    <Widget >
      <Widget.Header>
        <h3>{`Pergunta ${questionIndex + 1} de ${totalQuestions}`}</h3>
      </Widget.Header>

      <img alt="Descrição" style={{ width: '100%', height: '180px', objectFit: 'cover', }} src={question.image} />

      <Widget.Content>
        <h2>{question.title}</h2>
        <p>{question.description}</p>

        <AlternativesForm
          onSubmit={(infosDoEvento) => {
            infosDoEvento.preventDefault();
            setIsQuestionSubmited(true);

            setTimeout(() => {
              addResult(isCorrect);
              onSubmit(answer);
              setIsQuestionSubmited(false);
              setAnswer(undefined);
            }, 3000);
          }}
        >
          {question.alternatives.map((alternative, alternativeIndex) => {
            const alternativeId = `alternative__${alternativeIndex}`;
            const alternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR';
            const isSelected = answer === alternativeIndex;
            return (
              <Widget.Topic
                as="label"
                htmlFor={alternativeId}
                key={alternativeId}
                data-selected={isSelected}
                data-status={isQuestionSubmited && alternativeStatus}
              >
                <input
                  style={{ display: 'none' }}
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

          <Button type="submit" disabled={!hasAlternativeSelected}>Confirmar</Button>
          {isQuestionSubmited && isCorrect && <p>Você acertou!</p>}
          {isQuestionSubmited && !isCorrect && <p>Você errou!</p>}
        </AlternativesForm>
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
  const [results, setResults] = useState([]);

  function addResult(result) {
    setResults([
      ...results,
      result
    ]);
  }

  useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 1 * 1000);
  }, []);

  function handleSubmitQuiz(answer) {
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
              addResult={addResult}
            />
          )}

          {screenState === screenStates.LOADING && <LoadingWidget />}

          {screenState === screenStates.RESULT && (<ResultWidget router={router} results={results} totalQuestions={totalQuestions} />)}
        </QuizContainer>
      </QuizBackground>
    </>
  );
}
