import * as React from 'react';
import { FunctionComponent, useEffect, useRef, useState } from 'react';
import { Line } from '@ant-design/charts';
import { Area, TinyArea } from '@ant-design/charts';
window.React = React;
import './GraphComponent.scss';

export interface IProps {
  height: number;
  width: number;
}


export const GraphComponent: React.FC<IProps> = (props: IProps) => {
  const [data, setData] = useState([]);
  const {height, width} = props;
  useEffect(() => {
    asyncFetch();
  }, []);
  const asyncFetch = () => {
    fetch('https://gw.alipayobjects.com/os/bmw-prod/1d565782-dde4-4bb6-8946-ea6a38ccf184.json')
      .then((response) => response.json())
      .then((json) => {
        console.log('json', json)
        return setData(json);
      })
      .catch((error) => {
        console.log('fetch data failed', error);
      });
  };
  const config = {
    data,
    xField: 'Date',
    yField: 'scales',
    height, width,
    xAxis: {
      tickCount: 0,
    },
    yAxis: {
    },
    legend: false,
    meta: {
      Date: {
      },
      scales: {
        tickCount: 0,
      }
    },
    autoFit: true,
    areaStyle: function areaStyle(): any {
      return { fill: 'l(270) 0:#ffffff 0.5:#85A5FF 1:#85A5FF' };
    },
  };
  return <Area {...config} />;
};
