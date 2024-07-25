import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const SelecaoGenerica = ({ options, value, onChange, label = '' }) => {
    const [selectedValue, setSelectedValue] = useState(value || '');

    useEffect(() => {
        if (options.length === 1 && selectedValue !== options[0].nome) {
            const firstOption = options[0].nome;
            setSelectedValue(firstOption);
            onChange(options[0]);
        } else if (options.length > 1) {
            const currentOption = options.find(option => option.nome === selectedValue);
            if (!currentOption) {
                setSelectedValue('');
                onChange(null);
            }
        }
    }, [options, selectedValue, onChange]);

    useEffect(() => {
        if (value !== selectedValue) {
            setSelectedValue(value || '');
        }
    }, [value]);

    const handleChange = (event) => {
        const selectedOption = options.find(o => o.nome === event.target.value) || null;
        setSelectedValue(event.target.value);
        onChange(selectedOption);
    };

    return (
        <div className="selecao-generica">
            <select value={selectedValue} onChange={handleChange}>
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

// Validando as props para garantir a integridade dos dados
SelecaoGenerica.propTypes = {
    options: PropTypes.arrayOf(PropTypes.shape({
        nome: PropTypes.string.isRequired,
    })).isRequired,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string,
};

export default SelecaoGenerica;
