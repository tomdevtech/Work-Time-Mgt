import React, { useEffect, useState } from 'react';
import {
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
} from '@mui/material';
import {
  People as PeopleIcon,
  AccessTime as AccessTimeIcon,
  Assignment as AssignmentIcon,
} from '@mui/icons-material';
import axios from 'axios';

function Dashboard() {
  const [stats, setStats] = useState({
    totalEmployees: 0,
    totalTimeEntries: 0,
    totalActivities: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [employeesRes, timeEntriesRes, activitiesRes] = await Promise.all([
          axios.get('http://localhost:3000/api/employees'),
          axios.get('http://localhost:3000/api/time-management'),
          axios.get('http://localhost:3000/api/activities'),
        ]);

        setStats({
          totalEmployees: employeesRes.data.length,
          totalTimeEntries: timeEntriesRes.data.length,
          totalActivities: activitiesRes.data.length,
        });
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      }
    };

    fetchStats();
  }, []);

  const StatCard = ({ title, value, icon }) => (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box display="flex" alignItems="center" mb={2}>
          {icon}
          <Typography variant="h6" component="div" sx={{ ml: 1 }}>
            {title}
          </Typography>
        </Box>
        <Typography variant="h4" component="div">
          {value}
        </Typography>
      </CardContent>
    </Card>
  );

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <StatCard
            title="Total Employees"
            value={stats.totalEmployees}
            icon={<PeopleIcon color="primary" />}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <StatCard
            title="Time Entries"
            value={stats.totalTimeEntries}
            icon={<AccessTimeIcon color="primary" />}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <StatCard
            title="Activities"
            value={stats.totalActivities}
            icon={<AssignmentIcon color="primary" />}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard; 