import React from 'react';

const ExibicaoSala = ({ sala }) => {
    return (
        <div className="exibicao-sala">
            {sala && <h2>Sala: {sala}</h2>}
        </div>
    );
};

export default ExibicaoSala;
