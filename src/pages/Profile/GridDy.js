import React, { useState } from 'react';
import { Grid, Paper, Typography, TextField, Button, IconButton, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon, Save as SaveIcon, Cancel as CancelIcon } from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
//import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
//import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import styles from './DynamicJobGrid.module.css';

const DynamicJobGrid = () => {
  const [jobs, setJobs] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    company: '',
    jobType: 'Full',
    payroll: '',
    designation: '',
    fromDate: null,
    toDate: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (name) => (date) => {
    setFormData({ ...formData, [name]: date });
  };

  const handleAdd = () => {
    const newId = Math.max(...jobs.map(job => job.id), 0) + 1;
    setJobs([...jobs, { id: newId, ...formData }]);
    resetForm();
  };

  const handleEdit = (id) => {
    const jobToEdit = jobs.find(job => job.id === id);
    setFormData(jobToEdit);
    setEditingId(id);
  };

  const handleSave = () => {
    setJobs(jobs.map(job => 
      job.id === editingId ? { ...job, ...formData } : job
    ));
    setEditingId(null);
    resetForm();
  };

  const handleDelete = (id) => {
    setJobs(jobs.filter(job => job.id !== id));
  };

  const resetForm = () => {
    setFormData({
      company: '',
      jobType: 'Full',
      payroll: '',
      designation: '',
      fromDate: null,
      toDate: null,
    });
  };

  const renderForm = (isEditing = false) => (
    <div className={styles.form}>
      <TextField
        name="company"
        label="Company"
        value={formData.company}
        onChange={handleInputChange}
        fullWidth
        className={styles.formField}
      />
      <FormControl fullWidth className={styles.formField}>
        <InputLabel>Job Type</InputLabel>
        <Select
          name="jobType"
          value={formData.jobType}
          onChange={handleInputChange}
        >
          <MenuItem value="Full">Full</MenuItem>
          <MenuItem value="Contract">Contract</MenuItem>
        </Select>
      </FormControl>
      <TextField
        name="payroll"
        label="Payroll"
        value={formData.payroll}
        onChange={handleInputChange}
        fullWidth
        className={styles.formField}
      />
      <TextField
        name="designation"
        label="Designation"
        value={formData.designation}
        onChange={handleInputChange}
        fullWidth
        className={styles.formField}
      />

      {isEditing ? (
        <div className={styles.buttonGroup}>
          <Button onClick={handleSave} variant="contained" color="primary" startIcon={<SaveIcon />}>
            Save
          </Button>
          <Button onClick={() => setEditingId(null)} variant="outlined" color="secondary" startIcon={<CancelIcon />}>
            Cancel
          </Button>
        </div>
      ) : (
        <Button onClick={handleAdd} variant="contained" color="primary" startIcon={<AddIcon />} className={styles.addButton}>
          Add Job
        </Button>
      )}
    </div>
  );

  return (
    <div className={styles.container}>
      <Typography variant="h4" className={styles.title}>
        Job Information Grid
      </Typography>
      <Grid container spacing={3}>
        {jobs.map((job) => (
          <Grid item xs={12} sm={6} md={4} key={job.id}>
            <Paper className={styles.jobCard}>
              {editingId === job.id ? (
                renderForm(true)
              ) : (
                <div>
                  <Typography variant="h6">{job.company}</Typography>
                  <Typography>Job Type: {job.jobType}</Typography>
                  <Typography>Payroll: {job.payroll}</Typography>
                  <Typography>Designation: {job.designation}</Typography>
                  <Typography>From: {job.fromDate}</Typography>
                  <Typography>To: {job.toDate}</Typography>
                  <div className={styles.cardActions}>
                    <IconButton onClick={() => handleEdit(job.id)} size="small">
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(job.id)} size="small">
                      <DeleteIcon />
                    </IconButton>
                  </div>
                </div>
              )}
            </Paper>
          </Grid>
        ))}
      </Grid>
      <Paper className={styles.addJobForm}>
        <Typography variant="h6" className={styles.formTitle}>Add New Job</Typography>
        {renderForm()}
      </Paper>
    </div>
  );
};

export default DynamicJobGrid;