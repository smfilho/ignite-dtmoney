import Modal from 'react-modal';
import { FormEvent, useState, useContext } from 'react';
import { TransactionsContext } from '../../TransactionsContext';

import closeImg from '../../assets/close.svg';
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';

import { Container, TransactionTypeContainer, RadioBox } from './styles';
interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function NewTransactionModal({
  isOpen,
  onRequestClose,
}: NewTransactionModalProps) {
  const { createTransaction } = useContext(TransactionsContext);

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState('');
  const [type, setType] = useState('deposit');

  async function handleCreateNewTransaction(event: FormEvent) {
    event.preventDefault();

    await createTransaction({
      title,
      amount,
      category,
      type,
    });

    setTitle('');
    setAmount(0);
    setCategory('');
    setType('deposit');
    onRequestClose();
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName='react-modal-overlay'
      className='react-modal-content'
    >
      <button
        type='button'
        onClick={onRequestClose}
        className='btn-modal-close'
      >
        <img src={closeImg} alt='Close modal' />
      </button>

      <Container onSubmit={handleCreateNewTransaction}>
        <h2>Enter new transaction</h2>

        <input
          placeholder='Title'
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />

        <input
          placeholder='Amount'
          type='number'
          value={amount}
          onChange={(event) => setAmount(Number(event.target.value))}
        />

        <TransactionTypeContainer>
          <RadioBox
            type='button'
            isActive={type === 'deposit'}
            onClick={() => {
              setType('deposit');
            }}
            activeColor='green'
          >
            <img src={incomeImg} alt='Income' />
            <span>Income</span>
          </RadioBox>

          <RadioBox
            type='button'
            isActive={type === 'withdraw'}
            onClick={() => {
              setType('withdraw');
            }}
            activeColor='red'
          >
            <img src={outcomeImg} alt='Outcome' />
            <span>Outcome</span>
          </RadioBox>
        </TransactionTypeContainer>

        <input
          placeholder='Category'
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        />

        <button type='submit'>Submit</button>
      </Container>
    </Modal>
  );
}
