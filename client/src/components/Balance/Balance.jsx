import React, { useState, useRef, useEffect } from 'react';
import { Card, Grid, Text } from '@nextui-org/react';
import { PieChart } from 'react-minimal-pie-chart';
import { useSelector } from 'react-redux';
export const Balance = ({ total, income, outcome }) => {
	const operations = useSelector((state) => state.operations);
	const amountToDollars = (amount) => {
		const dollarUSLocale = Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD',
		});
		return dollarUSLocale.format(amount.toFixed(2));
	};

	return (
		<Grid.Container gap={2}>
			<Grid xs={12}>
				<Card>
					<div
						style={{
							display: 'flex',
							flexDirection: 'row',
							textAlign: 'center',
							justifyContent: 'space-around',
						}}
					>
						<div>
							<Text css={{ color: 'black' }} transform='capitalize'>
								Income: {amountToDollars(income)}
							</Text>
							<Text css={{ color: 'black' }} transform='capitalize'>
								Outcome: {amountToDollars(outcome)}
							</Text>
							<Text
								css={{ fontWeight: '$bold', color: 'black' }}
								transform='capitalize'
							>
								Result: {amountToDollars(total)}
							</Text>
						</div>
						<div
							style={{
								display: 'flex',
								flexDirection: 'row',
								textAlign: 'center',
								justifyContent: 'space-around',
							}}
						>
							{operations?.length ? (
								<PieChart
									data={[
										{ title: 'Income', value: income, color: '#7CC964' },
										{ title: 'Outcome', value: outcome, color: '#F31361' },
									]}
									label={({ dataEntry }) => dataEntry.value.toFixed(2)}
									style={{ height: '100px' }}
								/>
							) : (
								<Text
									css={{
										fontWeight: '$bold',
										color: 'black',
										width: '50%',
										textAlign: 'end',
									}}
								>
									Start using Alkemy wallet! Click on "Operations" and type in
									your income & outcome ops. Edit and delete them. Remember,
									opType is the only data that cant be updated.
								</Text>
							)}
						</div>
					</div>
				</Card>
			</Grid>
		</Grid.Container>
	);
};
