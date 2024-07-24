import React, { useState } from 'react';
import './styles/App.css';
import ErrorBoundary from './components/ErrorBoundary';
import SelecaoGenerica from './components/SelecaoGenerica';
import ExibicaoSala from './components/ExibicaoSala';
import Footer from './components/Footer'; // Importar o Footer
import dadosMock from "./data/mockData.json";
import '@fortawesome/fontawesome-free/css/all.min.css';
import frenteAnhanguera from './img/frente-anhanguera.png'

const App = () => {
  const [cursoSelecionado, setCursoSelecionado] = useState(null);
  const [disciplinaSelecionada, setDisciplinaSelecionada] = useState(null);
  const [professorSelecionado, setProfessorSelecionado] = useState(null);

  const handleCursoChange = (curso) => {
    if (curso) {
      setCursoSelecionado(curso);
      setDisciplinaSelecionada(null);
      setProfessorSelecionado(null);
    } else {
      setCursoSelecionado(null);
      setDisciplinaSelecionada(null);
      setProfessorSelecionado(null);
    }
  };

  const handleDisciplinaChange = (disciplina) => {
    if (disciplina) {
      setDisciplinaSelecionada(disciplina);
      setProfessorSelecionado(disciplina.professores.length === 1 ? disciplina.professores[0] : null);
    } else {
      setDisciplinaSelecionada(null);
      setProfessorSelecionado(null);
    }
  };

  const handleProfessorChange = (professor) => {
    setProfessorSelecionado(professor || null);
  };

  const cursosOrdenados = dadosMock.cursos ? dadosMock.cursos.slice().sort((a, b) => a.nome.localeCompare(b.nome)) : [];
  const disciplinasOrdenadas = cursoSelecionado && cursoSelecionado.disciplinas
    ? cursoSelecionado.disciplinas.slice().sort((a, b) => a.nome.localeCompare(b.nome))
    : [];
  const professoresOrdenados = disciplinaSelecionada && disciplinaSelecionada.professores
    ? disciplinaSelecionada.professores.slice().sort((a, b) => a.nome.localeCompare(b.nome))
    : [];

  return (
    <div className="App">
      <div className="cabecalho">
        <img src="https://www.imagensempng.com.br/wp-content/uploads/2020/12/006-3.png" alt="Logo Organiza Anhanguera" className="logo-anhanguera" />
        <h1>Organiza Anhanguera</h1>
        <h3>Caxias do Sul</h3>
      </div>
      <div className="container">
        <ErrorBoundary>
          <SelecaoGenerica
            options={cursosOrdenados}
            value={cursoSelecionado?.nome || ''}
            onChange={handleCursoChange}
            label=" Selecione o seu curso"
          />
          {cursoSelecionado && (
            <SelecaoGenerica
              options={disciplinasOrdenadas}
              value={disciplinaSelecionada?.nome || ''}
              onChange={handleDisciplinaChange}
              label="Selecione a sua disciplina"
            />
          )}
          {disciplinaSelecionada && (
            <SelecaoGenerica
              options={professoresOrdenados}
              value={professorSelecionado?.nome || ''}
              onChange={handleProfessorChange}
              label="Selecione o(a) professor(a)"
            />
          )}
          {professorSelecionado && (
            <ExibicaoSala sala={professorSelecionado.sala} />
          )}
        </ErrorBoundary>

      </div>
      <div className="rodape">
        {/* <img src={frenteAnhanguera} alt="Frente Anhanguera" className="imagem" /> */}
        <Footer />
        <div className="signature">por Gabriel Itaqui</div>
      </div>

    </div>
  );
};

export default App;
