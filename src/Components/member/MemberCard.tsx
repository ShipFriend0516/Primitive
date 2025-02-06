import { useState } from 'react';
import { MemberCardType } from '../../Types/MemberType';

const MemberCard = ({
  image,
  name,
  number,
  position,
  description,
  type,
  emoji,
  handleClick,
}: MemberCardType) => {
  return (
    <div className={` ${type === 'small' ? 'smallMemberCard' : 'memberCard'}`}>
      <div
        className='w-full bg-white text-9xl flex justify-center items-center cursor-pointer select-none'
        onClick={handleClick}
      >
        {image ? <img src={image} alt={name} /> : emoji}
      </div>
      <div className='bg-slate-900 w-full '>
        <span>{position}</span>
        <span className='text-2xl'>
          {name} {number}학번
        </span>
        <span className='text-gray-300'>{description}</span>
      </div>
    </div>
  );
};

export default MemberCard;
