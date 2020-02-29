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
import DraftTab from '../../Components/DraftTab'

import './index.scss';
import '../Orders/index.scss';

export default props => {
  return (
    <div>
        <div className="previous">
            <Icon path={mdiChevronLeft} className="chevron-icon"></Icon>
            Orders
        </div>
      <div className="order-header">
        <h4 className="order">Drafts</h4>
        <div className="draftbtn">
          <OrderButton value="Create Order" />
        </div>
      </div>
      <ul className="order-ul">
        <li className="draft-export">Export</li>
      </ul>
      <div>
        <Card className="order-card">
          <div className="all-order">
            <DraftTab/>
          </div>
          <div className="filter">
            <div className="filter-status">
              <Dropdown>
                <option>Filter</option>
              </Dropdown>
            </div>
            <FilterBar placeholder="Search draft orders" className="draft-filterbar"></FilterBar>
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
                  {TableData.draftsData.map(item => (
                    <th scope="col">{item.title}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {TableData.draftsData.map(item => (
                  <tr>
                    <td className="checkbox">
                      <input type="checkbox"></input>
                    </td>
                    <td className="order-item">{item.draft}</td>
                    <td>{item.date}</td>
                    <td>{item.customer}</td>
                    <td>
                      {item.status === 'Open' ? (
                        <div className="paid">
                          Open
                        </div>
                      ) : (
                        <div className="Closed">
                          Closed
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
