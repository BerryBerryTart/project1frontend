import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export default function CreateTicket(){
    const [amount, setAmount] = useState(0.0);
    const [description, setDescription] = useState("");
    const [type, setType] = useState("BUISNESS");
    const [receipt, setReceipt] = useState(null);
    const [error, setError] = useState(false);

    const history = useHistory();

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (!loggedInUser) {
            history.push('/login');
        }
    }, [history]);

    function handleSubmit(event){
        event.preventDefault();
        const data = {amount, description, type, receipt};

        async function postData(){
            await fetch('http://localhost:5000/add_ticket', {
                method: 'POST',
                body: JSON.stringify(data),
                credentials: 'include'
            }).catch(() => setError(true));
        }
        postData()
        .then(() => {
            if (error === false){
                setTimeout(() => history.push("/tickets"), 100);
            }
        });
    }

    async function handleFileSelect(file){
        const res = await toBase64(file);
        setReceipt(res.split(',')[1]);
    }

    function validateForm(){
        return description.length > 0 && receipt != null && amount > 0;
    }

    return (
        <div className="createTicketBox">
        <div className="createTicket">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="amount">Amount</label>
                    <input className="form-control" type="number" name="amount" onChange={e => setAmount(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        name="description"
                        rows="4"
                        maxLength="250"
                        onChange={e => setDescription( e.target.value )}
                        className="form-control"
                    >
                    </textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="type">Type</label>
                    <select
                        name="type"
                        onChange={e => setType(e.target.value)}
                        className="form-control"
                    >
                        <option value="BUISNESS">BUISNESS</option>
                        <option value="RELOCATION">RELOCATION</option>
                        <option value="OTHER">OTHER</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="reciept">Reciept File</label>
                    <input
                        type="file"
                        name="receipt"
                        onChange={e => handleFileSelect(e.target.files[0])}
                        accept="image/*"
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <input
                        type="submit"
                        value="Submit"
                        disabled={!validateForm()}
                        className="btn btn-primary"
                    />
                </div>
            </form>
        </div>
        </div>
    );
}