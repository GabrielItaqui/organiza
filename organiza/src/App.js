import React, { useState } from 'react';
import './styles/App.css';
import ErrorBoundary from './components/ErrorBoundary';
import SelecaoGenerica from './components/SelecaoGenerica';
import ExibicaoSala from './components/ExibicaoSala';
import dadosMock from "./data/mockData.json";

const App = () => {
  const [cursoSelecionado, setCursoSelecionado] = useState(null);
  const [disciplinaSelecionada, setDisciplinaSelecionada] = useState(null);
  const [professorSelecionado, setProfessorSelecionado] = useState(null);

  const handleCursoChange = (curso) => {
    if (curso) {
      setCursoSelecionado(curso);
      setDisciplinaSelecionada(null); // Limpa a seleção de disciplina
      setProfessorSelecionado(null); // Limpa a seleção de professor
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
      setProfessorSelecionado(null); // Limpa a seleção de professor se a disciplina for null
    }
  };

  const handleProfessorChange = (professor) => {
    setProfessorSelecionado(professor || null); // Trata o caso onde professor pode ser null
  };

  // Ordenar cursos
  const cursosOrdenados = dadosMock.cursos ? dadosMock.cursos.slice().sort((a, b) => a.nome.localeCompare(b.nome)) : [];

  // Ordenar disciplinas e professores quando selecionados
  const disciplinasOrdenadas = cursoSelecionado && cursoSelecionado.disciplinas
    ? cursoSelecionado.disciplinas.slice().sort((a, b) => a.nome.localeCompare(b.nome))
    : [];
  const professoresOrdenados = disciplinaSelecionada && disciplinaSelecionada.professores
    ? disciplinaSelecionada.professores.slice().sort((a, b) => a.nome.localeCompare(b.nome))
    : [];

  return (
    <div className="App">
      <img src="https://www.imagensempng.com.br/wp-content/uploads/2020/12/006-3.png" alt="Logo Organiza Anhanguera" />
      <h1>Organiza Anhanguera</h1>
      <ErrorBoundary>
        <SelecaoGenerica
          options={cursosOrdenados}
          value={cursoSelecionado?.nome || ''}
          onChange={handleCursoChange}
          label="Selecione o seu curso"
        />
        {cursoSelecionado && (
          <SelecaoGenerica
            options={disciplinasOrdenadas}
            value={disciplinaSelecionada?.nome || ''}
            onChange={handleDisciplinaChange}
            label="Selecione a disciplina"
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
  );
};

export default App;
