import { useState } from 'react'
import Toggle from 'react-toggle';

const StatusSwitch = ({ parentId, data, handleChange }: any) => {
  const [skillStatus, setSkillStatus] = useState(data.isActive)
  return (
    <Toggle
      id={data[parentId].toString()}
      icons={false}
      defaultChecked={skillStatus}
      onChange={(event:any) => {
        setSkillStatus(event.currentTarget.checked)
        handleChange(event, data)
      }}
    />
  )
}

export default StatusSwitch
