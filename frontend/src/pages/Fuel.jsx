import React from 'react';
import { Box } from '@mui/system';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

function Fuel() {
    const users = [
    { name: 'John Doe', email: 'john.doe@example.com' },
    { name: 'Jane Smith', email: 'jane.smith@example.com' },
        { name: 'John Doe', email: 'john.doe@example.com' },
    { name: 'Jane Smith', email: 'jane.smith@example.com' },
        { name: 'John Doe', email: 'john.doe@example.com' },
    { name: 'Jane Smith', email: 'jane.smith@example.com' },
        { name: 'John Doe', email: 'john.doe@example.com' },
    { name: 'Jane Smith', email: 'jane.smith@example.com' },
    // Add more users here
  ];
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          Users
        </Typography>
        <List>
          {users.map((user, index) => (
            <ListItem key={index}>
              <ListItemText primary={user.name} secondary={user.email} />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>

  )
}

export default Fuel