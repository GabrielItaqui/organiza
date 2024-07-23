import React from 'react';

const SelecaoGenerica = ({ options, value, onChange, label = '' }) => {

    return (
        <div className="selecao-generica">
            <select value={value || ''} onChange={(e) => onChange(options.find(o => o.nome === e.target.value) || null)}>
                <option value="">{label}</option>
                {options.map(option => (
                    <option key={option.nome} value={option.nome}>
                        {option.nome}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SelecaoGenerica;
