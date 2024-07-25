import React, { useState, useCallback } from 'react';
import './styles/App.css';
import ErrorBoundary from './components/ErrorBoundary';
import SelecaoGenerica from './components/SelecaoGenerica';
import ExibicaoSala from './components/ExibicaoSala';
import Footer from './components/Footer';
import dadosSalas2024 from "./data/dadosSalas2024.json";
import '@fortawesome/fontawesome-free/css/all.min.css';

const App = () => {
  // Estado para seleção
  const [cursoSelecionado, setCursoSelecionado] = useState(null);
  const [disciplinaSelecionada, setDisciplinaSelecionada] = useState(null);
  const [professorSelecionado, setProfessorSelecionado] = useState(null);

  // Função para lidar com a mudança do curso
  const handleCursoChange = useCallback((curso) => {
    setCursoSelecionado(curso || null);
    setDisciplinaSelecionada(null);
    setProfessorSelecionado(null);
  }, []);

  // Função para lidar com a mudança da disciplina
  const handleDisciplinaChange = useCallback((disciplina) => {
    setDisciplinaSelecionada(disciplina || null);
    setProfessorSelecionado(disciplina?.professores.length === 1 ? disciplina.professores[0] : null);
  }, []);

  // Função para lidar com a mudança do professor
  const handleProfessorChange = useCallback((professor) => {
    setProfessorSelecionado(professor || null);
  }, []);

  // Ordena e prepara os dados
  const cursosOrdenados = dadosSalas2024.cursos?.slice().sort((a, b) => a.nome.localeCompare(b.nome)) || [];
  const disciplinasOrdenadas = cursoSelecionado?.disciplinas?.slice().sort((a, b) => a.nome.localeCompare(b.nome)) || [];
  const professoresOrdenados = disciplinaSelecionada?.professores?.slice().sort((a, b) => a.nome.localeCompare(b.nome)) || [];

  return (
    <div className="App">
      <header className="cabecalho">
        <img src="https://www.imagensempng.com.br/wp-content/uploads/2020/12/006-3.png" alt="Logo Organiza Anhanguera" className="logo-anhanguera" />
        <h1>Organiza Anhanguera</h1>
        <h3>Caxias do Sul</h3>
      </header>
      <main className="container">
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
      </main>
      <footer className="rodape">
        <Footer />
        <div className="signature">por Gabriel Itaqui</div>
      </footer>
    </div>
  );
};

export default App;
