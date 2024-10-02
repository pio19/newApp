import React from 'react';
import { Card } from 'antd';

const { Meta } = Card;

const Product = ({ name, price, image }) => {
  return (
    <Card
      hoverable
      cover={<img alt={name} src={image} style={{ height: '200px', objectFit: 'cover' }} />}
    >
      <Meta title={name} description={`Price: ${price}`} />
    </Card>
  );
};

export default Product;
