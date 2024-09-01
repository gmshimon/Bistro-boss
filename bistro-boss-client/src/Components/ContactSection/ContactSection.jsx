import React from 'react'
import SectionTItle from '../SectionTitle/SectionTItle'
import { TbPhoneCall } from 'react-icons/tb'
import { MdAccessTimeFilled, MdLocationOn } from 'react-icons/md'

const ContactSection = () => {
  return (
    <section className='w-full mb-4'>
      <SectionTItle heading={'Our Location'} subHeading={'Visit us'} />
      <section className='flex justify-center w-full'>
        <div className='grid lg:grid-cols-3 grid-cols-1 gap-x-4 bg-slate-100'>
          <div>
            <div className='bg-[#D1A054] flex justify-center text-white text-2xl py-3 w-[250px]'>
              <TbPhoneCall />
            </div>
            <div className='text-center my-8'>
                <h2 className='text-xl uppercase font-semibold mb-2'>PHONE</h2>
                <p className='text-sm'>+880192345678910</p>
  
            </div>
          </div>
          <div>
            <div className='bg-[#D1A054] flex justify-center text-white text-2xl py-3 w-[250px]'>
              <MdLocationOn />
            </div>
            <div className='text-center my-8 '>
                <h2 className='text-xl uppercase font-semibold mb-2'>address</h2>
                <p className='text-sm'>+880192345678910</p>
  
            </div>
          </div>
          <div>
            <div className='bg-[#D1A054] flex justify-center text-white text-2xl py-3 w-[250px]'>
              <MdAccessTimeFilled />
            </div>
            <div className='text-center my-8'>
                <h2 className='text-xl uppercase font-semibold mb-2'>Working hours</h2>
                <p className='text-sm'>Mon - Fri : 08:00 - 22:00</p>
                <p className='text-sm'>Sat - Sun : 10:00 - 23:00</p>
  
            </div>
          </div>
        </div>
      </section>
    </section>
  )
}

export default ContactSection
