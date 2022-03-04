import React, { useState, useEffect } from 'react';
import './index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft, faCircle, faCheckCircle, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

const App = () => {
    const [inputValue, setInputValue] = useState('');
    const [totalItemCount, setTotalItemCount] = useState(0);

    const [items, setItems] = useState([{ itemName: 'item', quantity: 0, isSelected: false }]);
    const handleAddButtonClick = (index) => {
        const newItem = {
            itemName: inputValue,
            quantity: 1,
            isSelected: false,
        };
        const newItems = [...items, newItem];

        setItems(newItems);
        setInputValue('');
        calculateTotal();
    };
    const toggleComplete = (index) => {
        const newItems = [...items];
        newItems[index].isSelected = !newItems[index].isSelected;
        setItems(newItems);
    };

    const handleQuantityIncrease = (index) => {
        const newItems = [...items];

        newItems[index].quantity++;

        setItems(newItems);
        calculateTotal();
    };
    const handleQuantityDecrease = (index) => {
        const newItems = [...items];

        newItems[index].quantity--;

        setItems(newItems);
        calculateTotal();
    };
    //  const handleDeleteItem = (index) =>{
    //      const newItems = [...items];

    const calculateTotal = () => {
        const totalItemCount = items.reduce((total, item) => {
            return total + item.quantity;
        }, 1);
        setTotalItemCount(totalItemCount);
    };

    return (
        <div className='app-background'>
            <div className='main-container'>
                <div className='add-item-box'>
                    <input
                        value={inputValue}
                        onChange={(event) => setInputValue(event.target.value)}
                        className='add-item-input'
                        placeholder='Add an item...'
                    />
                    <FontAwesomeIcon icon={faPlus} onClick={() => handleAddButtonClick()} />
                </div>
                <div className='item-list'>
                    {items.map((item, index) => (
                        <div className='item-container'>
                            <div cassName='remove-button'>
                                <button class='trash-button'>
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                            </div>
                            <div className='item-name' onClick={() => toggleComplete(index)}>
                                {item.isSelected ? (
                                    <>
                                        <FontAwesomeIcon icon={faCheckCircle} />
                                        <span className='completed'>{item.itemName}</span>
                                    </>
                                ) : (
                                    <>
                                        <FontAwesomeIcon icon={faCircle} />
                                        <span>{item.itemName}</span>
                                    </>
                                )}
                            </div>
                            <div className='quantity'>
                                <button>
                                    <FontAwesomeIcon icon={faChevronLeft} onClick={() => handleQuantityDecrease(index)} />
                                </button>
                                <span> {item.quantity} </span>
                                <button>
                                    <FontAwesomeIcon icon={faChevronRight} onClick={() => handleQuantityIncrease(index)} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='total'>Total: {totalItemCount}</div>
            </div>
        </div>
    );
};

export default App;
