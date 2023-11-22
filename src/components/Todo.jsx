import React, { useEffect, useState } from 'react'


const Todo = () => {

    // To get the data from the local storage
    const getLocalData = () => {
        const lists = localStorage.getItem('mytodolist');
        if (lists) {
            return JSON.parse(lists);
        }
        else {
            return [];
        }
    }


    const [inputvalue, setInputvalue] = useState('');
    const [items, setItems] = useState(getLocalData());
    const [isEditItem, setIsEditItem] = useState('');
    const [toggleButton, setToggleButton] = useState(false);


    // add the item function
    const handleSubmit = () => {
        if (!inputvalue) {
            alert('please enter the item');
        } else if (inputvalue && toggleButton) {
            setItems(
                items.map((curElem) => {
                    if (curElem.id === isEditItem) {
                        return { ...curElem, name: inputvalue };
                    }
                    return curElem;
                })
            );

            setInputvalue("");
            setIsEditItem(null);
            setToggleButton(false);
        }
        else {
            const myNewInputData = {
                id: new Date().getTime().toString(),
                name: inputvalue
            }
            // setItems([...items, inputvalue]);
            // setInputvalue('');
            setItems([...items, myNewInputData]);
            setInputvalue('');
        }
    };

    // delete item
    const deleteItem = (id) => {
        const data = items.filter((item) => {
            return item.id !== id;
        });
        setItems(data);
    }

    // Edit the items:
    const editItem = (id) => {
        const item_edited_todo = items.find((curItem) => {
            return curItem.id === id;

        });
        setInputvalue(item_edited_todo.name);
        setIsEditItem(id);
        setToggleButton(true);


    }

    const removeBtn = () => {
        setItems([]);
    }

    // adding local storage
    useEffect(() => {
        localStorage.setItem("mytodolist", JSON.stringify(items));
    }, [items]);


    return (
        <>
            <div className='main-div'>
                {/* <img src='/images/2023.png' alt='calendar_img' /> */}
                <h1 ><span>📆</span>Let Things Get Done!</h1>
                <div className='todo-wrapper'>
                    <div>
                        <input type='text' placeholder='📝 Enter the item...' className='todo-input' value={inputvalue} onChange={(e) => setInputvalue(e.target.value)} />
                        {toggleButton ? (<i className="fa-regular fa-pen-to-square editbtn" onClick={handleSubmit}></i>)
                            : (<i className="fa-solid fa-plus plusbtn" onClick={handleSubmit}></i>)
                        }

                    </div>

                    {/* showing list items */}
                    <div className='todoitems'>
                        {items.map((todolist) => {
                            return (
                                <div className='show-items' key={todolist.id}>
                                    <div>
                                        <h3>{todolist.name}</h3>
                                    </div>
                                    <div className='todo-icons'>
                                        <i class="fa-regular fa-pen-to-square edit-btn" onClick={() => { editItem(todolist.id) }}></i>
                                        <i class="fa-solid fa-trash" onClick={() => { deleteItem(todolist.id) }}></i>

                                    </div>
                                </div>
                            )
                        })
                        }
                    </div>

                    {/* remove button */}
                    <div className='remove-items'>
                        <button className='btn effect04 removebtn' onClick={removeBtn}><span> Remove all</span></button>
                    </div>
                </div>
            </div>

        </>

    )
}

export default Todo