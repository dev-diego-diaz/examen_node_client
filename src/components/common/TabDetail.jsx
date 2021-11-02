import React, { useState } from "react";
import { Tabs } from "antd";
import Table from "./Table";
import FixedForm from "../forms/FixedForm";
import VariableForm from "../forms/VaribleForm";
import SavingForm from "../forms/SavingForm";

const TabDetail = ({ fixed, variable, saving }) => {
  //
  const { TabPane } = Tabs;

  const columnsFixed = [
    "Detail",
    "Cost",
    "Expiration",
    "Payment date",
    "Observations",
    "Category",
    "Created",
    "Updated",
    "-",
    "*",
  ];

  const columnsExpenses = [
    {
      title: "Detail",
      dataIndex: "detail",
      key: "detail",
    },
    {
      title: "Date Purchase",
      dataIndex: "date_purchase",
      key: "date_purchase",
    },
    {
      title: "Quotas",
      dataIndex: "quotas",
      key: "quotas",
    },
    {
      title: "First Quota",
      dataIndex: "first_quota",
      key: "first_quota",
    },
    {
      title: "Observations",
      dataIndex: "observations",
      key: "observations",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Created",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Updated",
      dataIndex: "updatedAt",
      key: "updatedAt",
    },
  ];

  const columnsSavings = [
    {
      title: "Detail",
      dataIndex: "detail",
      key: "detail",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Observations",
      dataIndex: "observations",
      key: "observations",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Created",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Updated",
      dataIndex: "updatedAt",
      key: "updatedAt",
    },
  ];

  return (
    <div>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Fixed Expenses" key="1">
          <FixedForm />
          <Table columns={columnsFixed} data={fixed} />
        </TabPane>
        <TabPane tab="Variable Expenses" key="2">
          <VariableForm />
          {/* <Table columns={columnsExpenses} dataSource={variable} /> */}
        </TabPane>
        <TabPane tab="Saving" key="3">
          <SavingForm />
          {/* <Table columns={columnsSavings} dataSource={saving} /> */}
        </TabPane>
      </Tabs>
    </div>
  );
};

export default TabDetail;
