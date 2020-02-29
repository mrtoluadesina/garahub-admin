import React from 'react';
import Icon from '@mdi/react';

import { 
    mdiChevronLeft,
    mdiChevronDown 
} from '@mdi/js';

import OrderButton from '../../Components/OrderButton/index';
import Dropdown from '../../Components/Dropdown/index';
import Card from '../../Components/Card';
import FilterBar from '../../Components/FilterBar';
import Table from '../../Components/Table';
import TableData from '../../utils/tabledata';
import AbandonedTab from '../../Components/AbandonedTab'

import '../Drafts/index.scss';
import '../AllOrders/index.scss';
import './index.scss';

export default props => {
  return (
    <div>
        <div className="previous">
            <Icon path={mdiChevronLeft} className="chevron-icon"></Icon>
            Orders
        </div>
      <div className="order-header">
        <h4 className="order">Abandoned Checkouts</h4>
        <div className="draftbtn">
          <OrderButton value="Export" />
        </div>
      </div>
      <div>
        <Card className="order-card">
          <div className="all-order">
            <AbandonedTab/>
          </div>
          <div className="filter">
            <div className="filter-status">
              <Dropdown>
                <option>Filter</option>
              </Dropdown>
            </div>
            <FilterBar placeholder="Search checkouts" className="draft-filterbar"></FilterBar>
          </div>
          <div>
            <Table>
              <thead>
                <tr>
                  <th className="checkbox checkbox-border" scope="col">
                    <input type="checkbox">
                    </input>
                    <Icon path={mdiChevronDown} className="chevron-icon"></Icon>
                  </th>
                  {TableData.abondonedData.map(item => (
                    <th scope="col">{item.title}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {TableData.abondonedData.map(item => (
                  <tr>
                    <td className="checkbox">
                      <input type="checkbox"></input>
                    </td>
                    <td className="order-item">{item.checkout}</td>
                    <td>{item.date}</td>
                    <td>{item.placedBy}</td>
                    <td>
                      {item.emailStatus === 'Not Sent' ? (
                        <div className="recovery">
                          Not Sent
                        </div>
                      ) : (
                        <div className="paid">
                          Sent
                        </div>
                      )}
                    </td>
                    <td>
                      {item.recoverStatus === 'Not Recovered' ? (
                        <div className="recovery">
                          Not Recovered
                        </div>
                      ) : (
                        <div className="paid">
                          Recovered
                        </div>
                      )}
                    </td>
                   <td>{item.total}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Card>
      </div>
    </div>
  );
};
