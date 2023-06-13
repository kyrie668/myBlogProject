'use client';

import React from 'react';
import { Button, Dropdown, Modal } from 'antd';

const MyModal = ({ open, detail }) => {
    console.log('detail', detail);
    return (
        <Modal open={true}>
            <p>1111</p>
            <p>1111</p>
        </Modal>
    );
};

export default MyModal;
