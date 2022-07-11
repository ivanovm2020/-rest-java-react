import React from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import *as url from 'app/axios/url';
import {
    Button,
    Container,
    Row,
    Col,
    Input,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Table,
    Jumbotron
} from 'reactstrap';
import {injectIntl, intlShape, FormattedMessage} from 'react-intl';

class RestLayout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            organizations: [],
            organizationName: '',
            organizationForm: '',
            organizationCapital: ''
            // userPassword: ''
        };

        //

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    componentDidMount() {
        axios.get(url.organization)
            .then(res =>
                this.setState({organizations: res.data})
            )
    }

    render() {
        // organization
        const {modal, organizations, organizationName, organizationForm, organizationCapital} = this.state;
        // const {modal, users, userName, userRole, userPassword} = this.state;
        const {intl} = this.props;
        return (
            <div>
                <Jumbotron>
                    <h5><FormattedMessage id='app.page.organization.text.first'/></h5>
                    <h5><FormattedMessage id='app.page.organization.text.second'/></h5>
                </Jumbotron>
                <Container>
                    <Row>
                        <Col xs="9">
                            <h1><FormattedMessage id='app.organization.table.title'/></h1>
                        </Col>
                        <Col xs="3" style={{marginTop: '10px'}}>
                            <Button color="primary"
                                    onClick={() => {
                                        this.toggle();
                                        this.setState(
                                            {organizationName: '', organizationForm: '', organizationCapital: ''}
                                        // {organizationName: '', organizationForm: '', userPassword: ''}
                                        )
                                    }}>
                                <FormattedMessage id='app.organization.table.add'/>
                            </Button>
                            <Modal isOpen={modal} toggle={this.toggle} className={this.props.className}>
                                <ModalHeader toggle={this.toggle}>
                                    <FormattedMessage id='app.organization.table.add'/>
                                </ModalHeader>
                                <ModalBody>
                                    <Input type="text" name="name" id="organizationName"
                                           placeholder={intl.formatMessage({id: 'app.organization.table.name'})}
                                           value={organizationName}
                                           onChange={value => this.setState({organizationName: value.target.value})}/>
                                    <br/>
                                    <Input type="text" name="form" id="organizationForm"
                                           placeholder={intl.formatMessage({id: 'app.organization.table.form'})}
                                           value={organizationForm}
                                           onChange={value => this.setState({organizationForm: value.target.value})}/>
                                    <br/>
                                    <Input type="number" min="0.00" max="1000000000.00" step="0.01" name="capital" id="organizationCapital"
                                           placeholder={intl.formatMessage({id: 'app.organization.table.capital'})}
                                           value={organizationCapital}
                                           onChange={value => this.setState({organizationCapital: value.target.value})}/>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="primary"
                                            onClick={() => {
                                                axios.put(url.organization,
                                                    {},
                                                    {params: {name: organizationName, form: organizationForm, capital: organizationCapital}})
                                                // {params: {name: userName, role: userRole, password: userPassword}})
                                                    .then(res =>
                                                        this.setState({organizations: res.data})
                                                    );
                                                this.toggle();
                                            }}>
                                        <FormattedMessage id='app.organization.table.add'/>
                                    </Button>{' '}
                                </ModalFooter>
                            </Modal>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Table>
                                <thead>
                                <tr>
                                    <th><FormattedMessage id='app.organization.table.id'/></th>
                                    <th><FormattedMessage id='app.organization.table.name'/></th>
                                    <th><FormattedMessage id='app.organization.table.form'/></th>
                                    <th><FormattedMessage id='app.organization.table.capital'/></th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                {organizations.map((item, index) =>
                                    <tr key={index}>
                                        <th>{item.id}</th>
                                        <th>{item.name}</th>
                                        <th>{item.form}</th>
                                        <th>{item.capital}</th>
                                        <th><Button color="secondary" size="sm"
                                                    onClick={() => {
                                                        axios.delete(url.organization, {params: {id: item.id}})
                                                            .then(res =>
                                                                this.setState({organizations: res.data})
                                                            )
                                                    }}>
                                            <FormattedMessage id='app.organization.table.delete'/>
                                        </Button></th>
                                    </tr>)
                                }
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    };

}

RestLayout.propTypes = {
    intl: intlShape.isRequired
};

const mapStateToProps = state => ({
    state: state.state.value
});

export default connect(mapStateToProps)(injectIntl(RestLayout));