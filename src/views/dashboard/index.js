/*!

=========================================================
* Black Dashboard React v1.2.2
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react plugin used to create charts
import { Line } from "react-chartjs-2";

import "./index.scss"

// reactstrap components
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Label,
  FormGroup,
  Input,
  Table,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";

// core components
import {
  chartExample1,
  chartExample2,
  chartExample3,
  chartExample4,
  weekly,
  monthly,
  yearly
} from "constants/charts.js";
import { useGetLoanStatsQuery } from "redux/dashboard";
import Loader from "components/loader";
import { addCommas } from "utils/number-formatter";
import { truncateString } from "utils/string-formatter";
import { useSelector } from "react-redux";

function Dashboard(props) {
  const [bigChartData, setbigChartData] = React.useState("weekly");

  const { data: loanStats, isLoading: loadingStats } = useGetLoanStatsQuery(bigChartData)
  const logged = useSelector(state => state.logged.data)

  const setBgChartData = (name) => {
    setbigChartData(name);
  };
  return (
    <>
      <div className="content">
        {
          logged.user.role === "lender" ?
            <Row>
              <Col xs="12">
                <Card className="card-chart">
                  <CardHeader>
                    <Row>
                      <Col className="text-left" sm="6">
                        <h5 className="card-category">Loan Applications</h5>
                        <CardTitle tag="h2">Statistics</CardTitle>
                      </Col>
                      <Col sm="6">
                        <ButtonGroup
                          className="btn-group-toggle float-right"
                          data-toggle="buttons"
                        >
                          <Button
                            tag="label"
                            className={classNames("btn-simple", {
                              active: bigChartData === "weekly",
                            })}
                            color="info"
                            id="0"
                            size="sm"
                            onClick={() => setBgChartData("weekly")}
                          >
                            <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                              Weekly
                            </span>
                            <span className="d-block d-sm-none">
                              <i className="tim-icons icon-single-02" />
                            </span>
                          </Button>
                          <Button
                            color="info"
                            id="1"
                            size="sm"
                            tag="label"
                            className={classNames("btn-simple", {
                              active: bigChartData === "monthly",
                            })}
                            onClick={() => setBgChartData("monthly")}
                          >
                            <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                              Monthly
                            </span>
                            <span className="d-block d-sm-none">
                              <i className="tim-icons icon-gift-2" />
                            </span>
                          </Button>
                          <Button
                            color="info"
                            id="2"
                            size="sm"
                            tag="label"
                            className={classNames("btn-simple", {
                              active: bigChartData === "yearly",
                            })}
                            onClick={() => setBgChartData("yearly")}
                          >
                            <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                              Yearly
                            </span>
                            <span className="d-block d-sm-none">
                              <i className="tim-icons icon-tap-02" />
                            </span>
                          </Button>
                        </ButtonGroup>
                      </Col>
                    </Row>
                  </CardHeader>
                  <CardBody>
                    {
                      loadingStats ?
                        <Loader /> :
                        <div className="chart-area">
                          {
                            bigChartData === "weekly" ?
                              <Line
                                id="loanstats"
                                data={(canvas) => weekly(canvas, loanStats?.data)}
                                options={chartExample1.options}
                              /> : bigChartData === "monthly" ?
                                <Line
                                  id="loanstats"
                                  data={(canvas) => monthly(canvas, loanStats?.data)}
                                  options={chartExample1.options}
                                /> :
                                <Line
                                  id="loanstats"
                                  data={(canvas) => yearly(canvas, loanStats?.data)}
                                  options={chartExample1.options}
                                />
                          }
                        </div>
                    }

                  </CardBody>
                </Card>
              </Col>
            </Row> : <></>
        }

        <Row>
          <Col lg="4">
            <Card className="card-chart count-card">
              <CardHeader>
                <i className="tim-icons icon-bell-55 text-info" />
                <h5 className="card-category">Pending</h5>
              </CardHeader>
              <CardBody tag="h3">
                {loanStats?.data?.pending}
              </CardBody>
            </Card>
          </Col>
          <Col lg="4">
            <Card className="card-chart count-card">
              <CardHeader>
                <i className="tim-icons icon-delivery-fast text-primary" />{" "}
                <h5 className="card-category">Approved</h5>
              </CardHeader>
              <CardBody tag="h3">
                {loanStats?.data?.approved}
              </CardBody>
            </Card>
          </Col>
          <Col lg="4">
            <Card className="card-chart count-card">
              <CardHeader>
                <i className="tim-icons icon-send text-success" />
                <h5 className="card-category">Rejected</h5>
              </CardHeader>
              <CardBody tag="h3">
                {loanStats?.data?.rejected}
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col lg="12" md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Recent Applications</CardTitle>
              </CardHeader>
              <CardBody>

                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>S/N</th>
                      <th>Loan Id</th>
                      <th>Type</th>
                      <th>Term</th>
                      <th>Amount(NGN)</th>
                      <th>Purpose</th>
                      <th className="text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      (!loadingStats) && loanStats?.data?.applications?.map((loan, idx) => (
                        <tr key={loan.id}>
                          <td>{idx + 1}</td>
                          <td>{loan.loanId}</td>
                          <td>{loan.type}</td>
                          <td>{loan.term}</td>
                          <td>{addCommas(loan.amount)}</td>
                          <td>{truncateString(loan.purpose, 20, true)}</td>
                          <td className="text-right">{loan.status}</td>
                        </tr>
                      ))
                    }


                  </tbody>
                </Table>
                {
                  loadingStats && <Loader size={60} />
                }
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Dashboard;
