import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import {
  Table,
  Col,
  Button,
  Breadcrumb,
  BreadcrumbItem,
  InputGroup,
  Input,
  InputGroupAddon,
} from 'reactstrap';
import { withRouter } from 'react-router-dom';
import { injectIntl, FormattedMessage } from 'react-intl';
import { MdAddCircleOutline, MdSearch } from 'react-icons/md';
import ReactPaginate from 'react-paginate';
import { decodeUserToken, getUserToken } from '../lib/auth';
import SupplierListItem from './supplier/SupplierListItem';
import { Loader } from '../components';
import config from '../config';

const SupplierList = props => {
  const {
    history,
    intl: { formatMessage },
  } = props;

  const {
    data: { storeId },
  } = decodeUserToken();

  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [result, setResult] = useState({ items: [], count: 0 });
  const [total, setTotal] = useState(-1);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    async function fetchItems() {
      try {
        const res = await axios({
          method: 'get',
          url: `${
            config.apiDomain
          }/stores/${storeId}/suppliers?page=${pageNo}&size=${pageSize}`,
          headers: {
            authorization: getUserToken(),
          },
        });

        const diff = res.data.count / pageSize;
        setResult({ items: res.data.data, count: res.data.count });
        setTotal(Number.isInteger(diff) ? diff : parseInt(diff) + 1);
      } catch (e) {
        //TODO: add error msg
        setResult({ items: [], count: 0 });
      }
    }
    fetchItems();
  }, [pageNo, selectedItem]);

  useEffect(() => {
    async function updateStatus() {
      try {
        const res = await axios({
          method: !selectedItem.status ? 'delete' : 'patch',
          url: `${config.apiDomain}/stores/${storeId}/suppliers/${
            selectedItem.id
          }`,
          headers: {
            authorization: getUserToken(),
          },
        });
      } catch (e) {
        //TODO: to be rewritten
        setSelectedItem(null);
      } finally {
        setSelectedItem(null);
      }
    }

    if (selectedItem) {
      updateStatus();
    }
  }, [selectedItem]);

  const viewItem = id => {
    history.push(`/suppliers/${id}`);
  };

  const updateStatus = (id, status) => {
    setSelectedItem({ id, status });
  };

  const changePage = page => {
    setPageNo(page.selected + 1);
  };

  return (
    <div>
      <div className="page-navbar">
        <div className="page-name">
          <FormattedMessage id="sys.suppliers" />
        </div>
        <Breadcrumb>
          <BreadcrumbItem>
            <Button color="link" onClick={() => history.push('/dashboard')}>
              <FormattedMessage id="sys.dashboard" />
            </Button>
          </BreadcrumbItem>
          <BreadcrumbItem active>
            <FormattedMessage id="sys.suppliers" />
          </BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div className="content-body">
        <div className="table-container">
          <Col md={12} className="table-content">
            {total < 0 ? (
              <Loader />
            ) : (
              <div>
                <div
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <div>
                    <InputGroup size="sm">
                      <Input
                        placeholder={formatMessage({ id: 'sys.search' })}
                      />
                      <InputGroupAddon addonType="append">
                        <Button color="secondary">
                          <MdSearch />
                        </Button>
                      </InputGroupAddon>
                    </InputGroup>
                  </div>
                  <Button
                    size="sm"
                    color="primary"
                    className="pull-right form-btn"
                    onClick={() => history.push('/new-supplier')}
                  >
                    <MdAddCircleOutline />
                    &nbsp;
                    <FormattedMessage id="sys.addNew" />
                  </Button>
                </div>
                <br />
                <Table responsive size="sm">
                  <thead className="table-header">
                    <tr>
                      <th width="10%">
                        <FormattedMessage id="sys.logo" />
                      </th>
                      <th width="25%">
                        <FormattedMessage id="sys.name" />
                      </th>
                      <th width="40%">
                        <FormattedMessage id="sys.contactInfo" />
                      </th>
                      <th width="10%">
                        <FormattedMessage id="sys.status" />
                      </th>
                      <th width="15%" />
                    </tr>
                  </thead>
                  <tbody>
                    {result.items.length > 0 ? (
                      result.items.map(item => (
                        <SupplierListItem
                          key={item.code}
                          id={item.code}
                          logo={item.logo}
                          name={item.name}
                          url={item.url}
                          address={item.address}
                          email={item.email}
                          contact={item.contact}
                          status={item.status}
                          onViewClick={viewItem}
                          onStatusUpdateClick={updateStatus}
                        />
                      ))
                    ) : (
                      <tr>
                        <td>
                          <FormattedMessage id="sys.noRecords" />
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
                <div className="pagination-container">
                  <span className="text-muted">
                    <FormattedMessage id="sys.total" /> {result.count}&nbsp;
                    <FormattedMessage id="sys.entries" />
                  </span>
                  <ReactPaginate
                    pageCount={total || 1}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    containerClassName="pagination"
                    subContainerClassName="pages pagination"
                    pageClassName="page-item"
                    breakClassName="page-item"
                    breakLabel="..."
                    pageLinkClassName="page-link"
                    previousLabel="‹"
                    nextLabel="›"
                    previousLinkClassName="page-link"
                    nextLinkClassName="page-link"
                    activeClassName="active"
                    onPageChange={changePage}
                  />
                </div>
              </div>
            )}
          </Col>
        </div>
      </div>
    </div>
  );
};

SupplierList.propTypes = {
  history: PropTypes.object.isRequired,
  intl: PropTypes.object.isRequired,
};

export default withRouter(injectIntl(SupplierList));
