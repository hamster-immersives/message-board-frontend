import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Card, CardActions, CardContent } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ErrorIcon from '@material-ui/icons/Error';
import { red } from '@material-ui/core/colors';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Context from '../Context/Context';

import { signin } from '../lib/api';

const styles = theme => ({
    card: {
        maxWidth: 600, 
        margin: 'auto',
        textAlign: 'center', 
        marginTop: theme.spacing(5), 
        paddingBottom: theme.spacing(2)
    }, 
    error: {
        verticalAlign: 'middle'
    },
    title: {
        marginTop: theme.spacing(2), 
        color: theme.palette.openTitle
    }, 
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 300  
    }, 
    submit: {
        margin: 'auto',
        marginBottom: theme.spacing(2)
    }
})


 class Signin extends Component {

    static contextType = Context; 

    state = {
        password: '',
        username: '',
        error: ''
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.context.isAuth && this.context.user) {
            this.props.history.push('/')
        }
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        let userInfo = {
            username: this.state.username,
            password: this.state.password
        }
        try {
            let success = await signin(userInfo);
            this.context.handleSignin(success);
        } catch (e) {
            this.setState({
                error: e
            })
        }
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value
        });
    }
    render() {
        const { classes } = this.props;
        return (
            <ValidatorForm onSubmit={this.handleSubmit}>
            <Card className={classes.card}>
                <CardContent>
                    <Typography
                        type="headline"
                        variant="h6"
                        className={classes.title}
                    >
                        Sign in
                    </Typography>

                    <TextValidator
                        id="username"
                        type="text"
                        label="username"
                        className={classes.textField}
                        value={this.state.username}
                        onChange={this.handleChange('username')}
                        margin="normal"
                        validators={['required']}
                        errorMessages={['this field is required']}
                      />
                      <br />{" "}            
                    <TextValidator
                        id="password"
                        type="password"
                        label="password"
                        className={classes.textField}
                        value={this.state.password}
                        onChange={this.handleChange('password')}
                        margin="normal"
                        validators={['required']}
                        errorMessages={['this field is required']}
                        />
                        <br />
                   
                        <br />
                              {
                                  this.state.error && (
                                      <Typography variant="h5" color="error">
                                          <ErrorIcon 
                                            style={{color: red[500]}}
                                            className={classes.error} />

                                               {this.state.error}                                             
                                  
                                      </Typography>
                                  )
                              }

                </CardContent>
                <CardActions>
                    <Button
                        color="primary"
                        variant="contained"
                        className={classes.submit}
                        type="submit"
                    >
                        Submit
                    </Button>
                </CardActions>
            </Card>
        </ValidatorForm>
        )
    }
}


export default withStyles(styles)(Signin);