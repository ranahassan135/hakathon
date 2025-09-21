import React, { useEffect, useState } from 'react'
import { Col, Row, Typography } from 'antd'

const { Title } = Typography
const Topbar = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString())
  useEffect(() => {
    setInterval(() => {
      setTime(new Date().toLocaleTimeString())
    }, 1000)
  }, [])

  return (
    <>
      <div className="conatiner">
        <Row>
          <Col span={24}>
            <Title level={4} className='text-center ' > {time} </Title>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default Topbar