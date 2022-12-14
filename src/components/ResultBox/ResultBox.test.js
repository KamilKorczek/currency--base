import ResultBox from './ResultBox';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { formatAmountInCurrency } from './../../utils/formatAmountInCurrency';

describe('Component ResultBox', () => {

  it('should render without crashing', () => {
    render(<ResultBox from="PLN" to="USD" amount={100} />);
  });

  const testCases = [250, 123, 673, 100];
  const testCasesLessThanZero = [
    { amount: '-100', from: 'PLN', to: 'USD' },
    { amount: '-20', from: 'USD', to: 'PLN' },
    { amount: '-200', from: 'PLN', to: 'USD' },
    { amount: '-345', from: 'USD', to: 'PLN' },
  ];

  it('should render proper info about conversion when PLN -> USD', () => {
    for (const testAmount of testCases) {
      render(<ResultBox from="PLN" to="USD" amount={testAmount} />);
      const divWithResult = screen.getByTestId('divWithResult');
      expect(divWithResult).toHaveTextContent(`${formatAmountInCurrency(testAmount, 'PLN')} = ${formatAmountInCurrency(testAmount/3.5, 'USD')}`);
      cleanup();
    }
  });

  it('should render proper info about conversion when USD -> PLN', () => {
    for (const testAmount of testCases) {
      render(<ResultBox from="USD" to="PLN" amount={testAmount} />);
      const divWithResult = screen.getByTestId('divWithResult');
      expect(divWithResult).toHaveTextContent(`${formatAmountInCurrency(testAmount, 'USD')} = ${formatAmountInCurrency(testAmount*3.5, 'PLN')}`);
      cleanup();
    }
  });

  it('should render proper info about conversion when USD -> USD', () => {
    for (const testAmount of testCases) {
      render(<ResultBox from="USD" to="USD" amount={testAmount} />);
      const divWithResult = screen.getByTestId('divWithResult');
      expect(divWithResult).toHaveTextContent(`${formatAmountInCurrency(testAmount, 'USD')} = ${formatAmountInCurrency(testAmount, 'USD')}`);
      cleanup();
    }
  });

  it('should render proper info about conversion when PLN -> PLN', () => {
    for (const testAmount of testCases) {
      render(<ResultBox from="PLN" to="PLN" amount={testAmount} />);
      const divWithResult = screen.getByTestId('divWithResult');
      expect(divWithResult).toHaveTextContent(`${formatAmountInCurrency(testAmount, 'PLN')} = ${formatAmountInCurrency(testAmount, 'PLN')}`);
      cleanup();
    }
  });

  it('should render proper info if value less then zero', () => {
    for (const testAmount of testCasesLessThanZero) {
      render(<ResultBox from={testAmount.from} to={testAmount.to} amount={Number(testAmount.amount)} />);
      const divWithResult = screen.getByTestId('divWithResult');
      expect(divWithResult).toHaveTextContent('Wrong value');
      cleanup();
    }
  });
});