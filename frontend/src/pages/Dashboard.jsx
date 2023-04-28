import React from 'react';
import { Container, Box, Card, CardContent, Typography } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { PieChart } from 'react-minimal-pie-chart';

// Sample data
const sampleData = [
  { id: 1, title: 'Total Drivers', description: '34' },
  { id: 3, title: 'Total atendant', description: '6' },
  { id: 2, title: 'Fuel conseption', description: '34343 L' },
];
const sampleData2 = [
  { name: '2010', value: 400 },
  { name: '2011', value: 300 },
  { name: '2012', value: 200 },
  { name: '2013', value: 278 },
  { name: '2014', value: 189 },
];
const sampleData3 = [
  { title: 'Item 1', value: 10, color: '#E38627' },
  { title: 'Item 2', value: 15, color: '#C13C37' },
  { title: 'Item 3', value: 20, color: '#6A2135' },
];
function Dashboard() {
  return (
    <>
    <Container>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        {sampleData.map((item) => (
          <Card key={item.id} sx={{ flexGrow: 1, minWidth: 200 }}>
            <CardContent>
              <Typography variant="h5">{item.title}</Typography>
              <Typography variant="body2">{item.description}</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Box sx={{ mt: 10 }}>
        <BarChart
          width={500}
          height={300}
          data={sampleData2}
          margin={{
            top: 5,
            right: 30,
            left: 2,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </Box>
     
      <Box sx={{ mt: 0 }}>
        <PieChart
        sx={{ mt: 0 }}
        radius={20}
          data={sampleData3}
          lineWidth={30}
          // label={({ dataEntry }) => `\${Math.round(dataEntry.percentage)}%`}
          labelStyle={{
            fontSize: '2px',
            fontFamily: 'sans-serif',
          }}
        />
      </Box>
    </Container>
    </>
  );
}

export default Dashboard;
