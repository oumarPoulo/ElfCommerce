import React, { useState, useEffect, useContext, useLayoutEffect } from 'react';
import axios from 'axios';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { FormattedMessage, injectIntl } from 'react-intl';
import {
  Alert,
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  FormGroup,
  Input,
  Label,
  Row,
} from 'reactstrap';
import { MdSave } from 'react-icons/md';

import config from '../../config';
import { FormContext } from '../contexts';
import { getUserToken } from '../../lib/auth';
import { IntlContext } from '../../context/IntlContext';
import { ParallelLoader } from '../../components/Loader';

const storeSettingValidation = Yup.object().shape({
  name: Yup.string().required('Required'),
  currencyId: Yup.number().required('Required'),
  countryId: Yup.number().required('Required'),
  language: Yup.string().required('Required'),
});


// eslint-disable-next-line react/prop-types
const StoreSettingForm = ({ intl }) => {
  const intlContext = useContext(IntlContext);
  const [ countries, setCountries ] = useState([]);
  const [ currencies, setCurrencies ] = useState([]);
  const [ itemDetails, setItemDetails ] = useState({});
  const [ submitError, setSubmitError ] = useState(false);
  const [ submitSuccess, setSubmitSuccess ] = useState(false);
  const { storeId } = useContext(FormContext);

  useEffect(() => {
    async function fetchCountries() {
      try {
        const res = await axios.get(`${config.apiDomain}/countries`, {
          headers: {
            authorization: getUserToken(),
          },
        });

        setCountries(res.data);
      } catch (e) {}
    }

    fetchCountries();
  }, []);

  useEffect(() => {
    async function fetchCurrencies() {
      try {
        const res = await axios.get(`${config.apiDomain}/currencies`, {
          headers: {
            authorization: getUserToken(),
          },
        });

        setCurrencies(res.data);
      } catch (e) {}
    }

    fetchCurrencies();
  }, []);

  useEffect(() => {
    async function fetchItemDetails() {
      try {
        const res = await axios.get(`${config.apiDomain}/stores/${storeId}`, {
          headers: {
            authorization: getUserToken(),
          },
        });

        setItemDetails(res.data);
      } catch (e) {}
    }

    fetchItemDetails();
  }, []);

  async function updateSettings(values) {
    try {
      await axios({
        method: 'put',
        url: `${config.apiDomain}/stores/${storeId}`,
        headers: {
          authorization: getUserToken(),
          'Content-Type': 'application/json',
        },
        data: values,
      });
      // track store locale changes
      const localeHasChanged = itemDetails.language !== values.language;
      setSubmitSuccess(true);
      setItemDetails(values);
      // set new locale
      if (localeHasChanged) {
        intlContext.switchLocale(values.language);
      }
    } catch (e) {
      setSubmitError(true);
    }
  }

  return !itemDetails ? (
    <ParallelLoader />
  ) : (
    <Formik
      enableReinitialize
      initialValues={{ ...itemDetails }}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(true);
        updateSettings(values);
        setSubmitting(false);
      }}
      validationSchema={storeSettingValidation}
    >
      {({
        values: {
          name = '',
          description = '',
          currencyId = '',
          countryId = '',
          language = '',
          facebook = '',
          twitter = '',
        },
        handleChange,
        isSubmitting,
        errors,
      }) => (
        <Form>
          <Row>
            <Col sm="12">
              <Button
                type="submit"
                size="sm"
                color="primary"
                className="pull-right"
                disabled={isSubmitting}
              >
                <MdSave />
                &nbsp;
                <FormattedMessage id="sys.save" />
              </Button>
              <br />
              <br />
              {submitError ? (
                <Alert color="danger">
                  <FormattedMessage id="sys.newFailed" />
                </Alert>
              ) : submitSuccess ? (
                <Alert color="success">
                  <FormattedMessage id="sys.newSuccess" />
                </Alert>
              ) : null}
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Card>
                <CardHeader>
                  <FormattedMessage id="sys.basicInfo" />
                </CardHeader>
                <CardBody>
                  <FormGroup row>
                    <Label for="name" sm={3}>
                      <FormattedMessage id="sys.storeName" />
                      <span className="text-danger mandatory-field">*</span>
                    </Label>
                    <Col sm={9}>
                      <Input
                        name="name"
                        id="name"
                        value={name}
                        onChange={handleChange}
                      />
                      {errors.name && (
                        <div className="text-danger">{errors.name}</div>
                      )}
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="description" sm={3}>
                      <FormattedMessage id="sys.desc" />
                    </Label>
                    <Col sm={9}>
                      <Input
                        type="textarea"
                        name="description"
                        id="description"
                        value={description}
                        onChange={handleChange}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="currencyId" sm={3}>
                      <FormattedMessage id="sys.currency" />
                      <span className="text-danger mandatory-field">*</span>
                    </Label>
                    <Col sm={9}>
                      <Input
                        type="select"
                        name="currencyId"
                        id="currency-id"
                        onChange={handleChange}
                        value={currencyId}
                      >
                        <option value="">--</option>
                        {currencies.map(currency => (
                          <option key={currency.id} value={currency.id}>
                            {currency.name}
                          </option>
                        ))}
                      </Input>
                      {errors.currencyId && (
                        <div className="text-danger">{errors.currencyId}</div>
                      )}
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="countryId" sm={3}>
                      <FormattedMessage id="sys.country" />
                      <span className="text-danger mandatory-field">*</span>
                    </Label>
                    <Col sm={9}>
                      <Input
                        type="select"
                        name="countryId"
                        id="country-id"
                        onChange={handleChange}
                        value={countryId}
                      >
                        <option value="">--</option>
                        {countries.map(country => (
                          <option key={country.id} value={country.id}>
                            {country.name}
                          </option>
                        ))}
                      </Input>
                      {errors.countryId && (
                        <div className="text-danger">{errors.countryId}</div>
                      )}
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="language" sm={3}>
                      <FormattedMessage id="sys.lang" />
                      <span className="text-danger mandatory-field">*</span>
                    </Label>
                    <Col sm={9}>
                      <Input
                        type="select"
                        name="language"
                        id="language"
                        onChange={handleChange}
                        value={language}
                      >
                        {[
                          {
                            id: 'en',
                            // eslint-disable-next-line react/prop-types
                            name: intl.formatMessage({ id: 'sys.localeEN'}),
                          },
                          {
                            id: 'fr',
                            // eslint-disable-next-line react/prop-types
                            name: intl.formatMessage({ id: 'sys.localeFR'}),
                          },
                        ].map(lang => (
                          <option key={lang.id} value={lang.id}>
                            {lang.name}
                          </option>
                        ))}
                      </Input>
                      {errors.language && (
                        <div className="text-danger">{errors.language}</div>
                      )}
                    </Col>
                  </FormGroup>
                </CardBody>
              </Card>
            </Col>
            <Col md={6}>
              <Card>
                <CardHeader>
                  <FormattedMessage id="sys.socialMedia" />
                </CardHeader>
                <CardBody>
                  <FormGroup row>
                    <Label for="facebook" sm={3}>
                      <FormattedMessage id="sys.facebook" />
                    </Label>
                    <Col sm={9}>
                      <Input
                        name="facebook"
                        id="facebook"
                        onChange={handleChange}
                        value={facebook}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="twitter" sm={3}>
                      <FormattedMessage id="sys.twitter" />
                    </Label>
                    <Col sm={9}>
                      <Input
                        name="twitter"
                        id="twitter"
                        onChange={handleChange}
                        value={twitter}
                      />
                    </Col>
                  </FormGroup>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Form>
      )}
    </Formik>
  );
};

export default injectIntl(StoreSettingForm);
