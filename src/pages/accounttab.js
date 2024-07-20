import React from 'react';
import './accounttab.css';
import Sidebar from '../components/sidebar';

function Accounttab() {
  return (
    <div>
    <Sidebar></Sidebar>
    <div className="account-tab">
      <div className="main-content">
        <div className="content-container">
          <div className="subject-table-header">SUBJECT TABLE
            <div className='table'>table</div>
          </div>
          <div className="subject-table">
            <div className="table-row">
              <div className="table-cell">
                <div className="cell-label">Tuition - Academic :</div>
                <div className="cell-value">text</div>
              </div>
              <div className="table-cell">
                <div className="cell-label">Total amount due:</div>
                <div className="cell-value">text</div>
              </div>
            </div>
            <div className="table-row half-width">
              <div className="table-cell">
                <div className="cell-label">Miscellaneous :</div>
                <div className="cell-value">text</div>
              </div>
            </div>
            <div className="table-row half-width">
              <div className="cell-value">text</div>
            </div>
            <div className="table-row half-width">
              <div className="table-cell">
                <div className="cell-label">Other Fees :</div>
                <div className="cell-value">text</div>
              </div>
            </div>
            <div className="table-row half-width">
              <div className="cell-value">text</div>
            </div>
            <div className="table-row half-width">
              <div className="table-cell">
                <div className="cell-label">Laboratory Fees :</div>
                <div className="cell-value">text</div>
              </div>
            </div>
            <div className="table-footer">
              <div className="footer-column">
                <div className="cell-value">text</div>
              </div>
              <div className="footer-column">
                <div className="proceed-button">
                  <div className="button-content">
                    <div className="button-text">PROCEED TO PAYMENTS</div>
                    <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/b0a73435e2297fbd11d5461c534cb0f523a5084661298b4054ed0d8805ac7a46?apiKey=a38f3cba0a6b4fdbabbbee8891d4e212&" className="button-icon" alt="Proceed icon" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Accounttab;
