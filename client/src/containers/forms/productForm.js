import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { injectIntl, FormattedMessage } from 'react-intl';
import {
  Col,
  Row,
  Form,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Label,
  InputGroupAddon,
  Input,
  InputGroup,
} from 'reactstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const validate = (values) => {
  const errors = {};
  if (!values.categoryName) {
    errors.categoryName = 'Required';
  }
  if (!values.newPwd) {
    errors.newPwd = 'Required';
  }
  return errors;
};

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
    ['link', 'image', 'video'],
    ['clean'],
  ],
};

const formats = [
  'header',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'video',
];

const renderField = ({
  input, label, type, meta: { touched, error },
}) => (
  <div>
    <Input {...input} placeholder={label} type={type} />
    {touched && (error && <span className="text-danger">{error}</span>)}
  </div>
);

const renderDecimalField = ({
  input, type, meta: { touched, error },
}) => (
  <div>
    <Input {...input} placeholder="0.00" type={type} step=".01" />
    {touched && (error && <span className="text-danger">{error}</span>)}
  </div>
);

const renderNumberField = ({
  input, type, meta: { touched, error },
}) => (
  <div>
    <Input {...input} placeholder="0" type={type} />
    {touched && (error && <span className="text-danger">{error}</span>)}
  </div>
);

const renderTextArea = ({
  input, type, meta: { touched, error },
}) => (
  <div>
    <ReactQuill
      modules={modules}
      formats={formats}
      style={{ height: 180 }}
      value={input.value}
    />
  </div>
);

class ProductForm extends Component {
  render() {
    const { onSubmit, categories, currencies } = this.props;
    const { formatMessage } = this.props.intl;
    return (
      <Form onSubmit={onSubmit}>
        <Row>
          <Col md={7}>
            <Card>
              <CardHeader><FormattedMessage id="sys.productInfo" /></CardHeader>
              <CardBody>
                <FormGroup row>
                  <Label for="name" sm={3}>
                    <FormattedMessage id="sys.productName" />
                  </Label>
                  <Col sm={9}>
                    <Field
                      component={renderField}
                      name="name"
                      className="form-control"
                      id="name"
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="description" sm={3}>
                    <FormattedMessage id="sys.desc" />
                  </Label>
                  <Col sm={9}>
                    <Field
                      component={renderTextArea}
                      name="description"
                      className="form-control"
                      id="description"
                    />
                  </Col>
                </FormGroup>
                <br />
                <br />
                <br />
                <FormGroup row>
                  <Label for="sku" sm={3}>
                    <FormattedMessage id="sys.sku" />
                  </Label>
                  <Col sm={9}>
                    <Field
                      component={renderField}
                      name="sku"
                      className="form-control"
                      id="sku"
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="category" sm={3}>
                    <FormattedMessage id="sys.category" />
                  </Label>
                  <Col sm={9}>
                    <Input type="select" name="category">
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))}
                    </Input>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="cost" sm={3}>
                    <FormattedMessage id="sys.costPrice" />
                  </Label>
                  <Col sm={9}>
                    <Field
                      component={renderDecimalField}
                      type="number"
                      name="cost"
                      id="cost"
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="manufacturer" sm={3}>
                    <FormattedMessage id="sys.manufacturer" />
                  </Label>
                  <Col sm={9}>
                    <Input type="select" name="manufacturer">
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))}
                    </Input>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="supplier" sm={3}>
                    <FormattedMessage id="sys.supplier" />
                  </Label>
                  <Col sm={9}>
                    <Input type="select" name="supplier">
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))}
                    </Input>
                  </Col>
                </FormGroup>                
              </CardBody>
            </Card>
          </Col>
          <Col md={5}>
            <Card>
              <CardHeader><FormattedMessage id="sys.inventory" /></CardHeader>
              <CardBody>
                <FormGroup row>
                  <Label for="allow-quantity" sm={4}>
                    <FormattedMessage id="sys.allowQty" />?
                  </Label>
                  <Col sm={8}>
                    <InputGroup>
                      <Field
                        component="input"
                        type="checkbox"
                        name="allow-quantity"
                        id="allow-quantity"
                        style={{width:32, height:32}}
                      />
                    </InputGroup>
                  </Col>
                </FormGroup>                
                <FormGroup row>
                  <Label for="qty" sm={4}>
                    <FormattedMessage id="sys.qty" />
                  </Label>
                  <Col sm={8}>
                    <InputGroup>
                      <Field
                        component={renderNumberField}
                        type="number"
                        name="quantity"
                        id="quantity"
                        checked
                      />
                    </InputGroup>
                  </Col>
                </FormGroup>
              </CardBody>
            </Card><br />
            <Card>
              <CardHeader><FormattedMessage id="sys.price" /></CardHeader>
              <CardBody>
                <FormGroup row>
                  <Label for="price" sm={4}>
                    <FormattedMessage id="sys.price" />
                  </Label>
                  <Col sm={8}>
                    <Field
                      component={renderDecimalField}
                      type="number"
                      name="price"
                      id="price"
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="discount" sm={4}>
                    <FormattedMessage id="sys.discountBy" />
                  </Label>
                  <Col sm={8}>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <Input type="select" name="discountType">
                          <option value="percent">%</option>
                          <option value="value">$</option>
                        </Input>
                      </InputGroupAddon>
                      <Field
                        component={renderDecimalField}
                        type="number"
                        name="discount"
                        id="discount"                        
                      />
                    </InputGroup>
                  </Col>
                </FormGroup>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Form>
    );
  }
}

ProductForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
  intl: PropTypes.object.isRequired,
};

ProductForm = reduxForm({
  form: 'productForm',
  validate,
})(ProductForm);

export default connect((state) => {
  const {
    name, description, sku, price, quantity,
  } = state.productReducer.productDetails;
  return {
    initialValues: {
      name,
      description,
      sku,
      price,
      quantity,
    },
    enableReinitialize: true,
  };
})(injectIntl(ProductForm));