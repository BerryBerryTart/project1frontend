import React, { useState, useEffect } from 'react';

export default function CreateTicket(){
    const [amount, setAmount] = useState(0.0);
    const [description, setDescription] = useState("");
    const [type, setType] = useState("BUISNESS");
    const [receipt, setReceipt] = useState(null);

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    function handleSubmit(event){
        event.preventDefault();
        const data = {amount, description, type, receipt};

    }

    async function handleFileSelect(file){
        const res = await toBase64(file);
        setReceipt(res.split(',')[1]);
    }

    function validateForm(){
        return description.length > 0 && receipt != null && amount > 0;
    }

    return (
        <div className="createTicket">
            <form>
                <label htmlFor="amount">Amount</label>
                <input type="number" name="amount" onChange={e => setAmount(e.target.value)}/>
                <br></br>
                <label htmlFor="description">Description</label>
                <textarea
                    name="description"
                    maxLength="250"
                    onChange={e => setDescription( e.target.value )}>
                </textarea>
                <br></br>
                <label htmlFor="type">Type</label>
                <select
                    name="type"
                    onChange={e => setType(e.target.value)}
                >
                    <option value="BUISNESS">BUISNESS</option>
                    <option value="RELOCATION">RELOCATION</option>
                    <option value="OTHER">OTHER</option>
                </select>
                <br></br>
                <label htmlFor="reciept">Reciept File</label>
                <input
                    type="file"
                    name="receipt"
                    onChange={e => handleFileSelect(e.target.files[0])}
                    accept="image/*"
                />
                <br></br>
                <input type="submit" value="Submit" disabled={!validateForm()}/>
            </form>
        </div>
    );
}