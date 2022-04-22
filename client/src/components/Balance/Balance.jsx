import React, { useState, useRef, useEffect } from 'react';
import { Card, Grid, Text } from '@nextui-org/react';
import { useSelector } from 'react-redux';
export const Balance = () => {
	const operations = useSelector((state) => state.operations);

	// const totalIncome = operations
	// 	.filter((operation) => operation.opType === 'income')
	// 	.reduce((a, b) => a + b);

	// const totalOutcome = operations
	// 	.filter((operation) => operation.opType === 'outcome')
	// 	.reduce((a, b) => a + b);

	return (
		<Grid.Container gap={2}>
			<Grid xs={12} md={4}>
				<Card
				// color={
				// 	// totalIncome - totalOutcome
				// 	//  >= 0 ? 'success' : 'warning'
				// 	 }
				>
					<Text
						css={{ fontWeight: '$bold', color: '$white' }}
						transform='capitalize'
					>
						{/* {total.current} */}
					</Text>
					{/* <Text css={{ fontWeight: '$bold', color: '$white' }} span>
						{color}
					</Text> */}
				</Card>
			</Grid>
		</Grid.Container>
	);
};
