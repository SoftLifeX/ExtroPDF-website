"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCardIcon } from "lucide-react";
import { Transaction } from "@prisma/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Badge } from "../ui/badge";

type TransactionCardProps = {
  transactions: Transaction[];
};

const TransactionTable = ({ transactions }: TransactionCardProps) => {
  return (
    <Card className="my-12">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCardIcon className="h-5 w-5" />
          Transaction History
        </CardTitle>
      </CardHeader>
      <CardContent>
        {transactions && transactions?.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Payment ID</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions?.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>
                    {new Date(transaction.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{transaction.plan}</TableCell>
                  <TableCell>{transaction.transactionId}</TableCell>
                  <TableCell>
                    {transaction.amount / 100} {transaction.currency_code}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="default"
                      className="bg-green-500/10 text-green-500 hover:bg-green-500/20"
                    >
                      {transaction.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <h2>No History Available</h2>
        )}
      </CardContent>
    </Card>
  );
};

export default TransactionTable;
