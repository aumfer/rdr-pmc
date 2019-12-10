import * as React from "react";
import * as ReactDOM from "react-dom";
import * as SocketIO from 'socket.io-client';
// todo fixme not sure what's up with these imports
import { observable } from '../node_modules/mobx/lib/mobx';
import { observer } from '../node_modules/mobx-react/dist/mobx-react';
import { FixedSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

interface ITransaction {
    hash: string
}

const transactions = observable(([] as ITransaction[]));

const socketServer = process.env.SOCKET_SERVER || 'http://localhost';
console.log(`connecting to ${socketServer}`);
const socketIo = SocketIO(socketServer);
socketIo.on('message', function (transaction: ITransaction) {
    transactions.push(transaction);
    const MAX_TRANSACTIONS = 10000;
    if (transactions.length > MAX_TRANSACTIONS) {
        transactions.shift();
    }
});

interface ITransactionsListProps {
    transactions: ITransaction[]
}

const height = 640;
const width = '50%';
const TransactionsList = observer(({ transactions }: ITransactionsListProps) =>
    <div>
        <h1>Transactions</h1>
        <h6>via {socketServer}</h6>
        <FixedSizeList height={height} width={width} itemSize={46} itemCount={transactions.length}>
            {({ index, style }) =>
                <li style={style}>
                    {transactions[index].hash}
                </li>
            }
        </FixedSizeList>
    </div>
);

ReactDOM.render(
    <TransactionsList transactions={transactions} />,
    document.body
);
