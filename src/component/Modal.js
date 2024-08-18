import React, { useState } from 'react';
import Button from '../component/Button';
import "./Modal.css";

const [modal, setModal] = useState(false);

return (
    <Button onclick={setModal(true)}> Open Modal </Button>
)