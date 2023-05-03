import React, { useEffect, useState } from 'react'

import axios from 'axios'

import {
  IoMdSunny,
  IoMdRainy,
  IoMdCloudy,
  IoMdSnow,
  IoMdThunderstorm,
  IoMdSearch,
} from 'react-icons/io'

import {
  BsCloudHaze2Fill,
  BsCloudDrizzleFill,
  BsEye,
  BsWater,
  BsThermometer,
  BsWind,
} from 'react-icons/bs'

import { TbTemperatureCelsius } from 'react-icons/tb'

import { ImSpinner8 } from 'react-icons/im'

const APIkey = 'df75d4cb56eca306a21c8b1c9eb9648f'

const App = () => {
  const [data, setData] = useState(null)
  const [location, setLocation] = useState('Tokyo')
  const [inputValue, setInputValue] = useState('')
  const [animate, setAnimate] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const handleInput = (e) => {
    setInputValue(e.target.value)
  }

  const handleSubmit = (e) => {
    // if inputValue is not empty
    if (inputValue !== '') {
      setLocation(inputValue)
    }
    // if inputValue is empty
    if (inputValue === '') {
      setAnimate(true)
      setTimeout(() => {
        setAnimate(false)
      }, 500)
    }

    const input = document.querySelector('input')

    input.value = ''

    e.preventDefault()
  }

  useEffect(() => {
    setLoading(true)

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${APIkey}`

    axios.get(url).then((res) => {
      setTimeout(() => {
        setData(res.data)
        setLoading(false)
      }, 1500)
    }).catch((err) => {
      setLoading(false)
      setErrorMsg(err)
    })
  }, [location])

  useEffect(() => {
    const timer = setTimeout(() => {
      setErrorMsg('')
    }, 2000)
    return () => clearTimeout(timer)
  }, [errorMsg])


  if (!data) {
    return (
      <div className='bg-bg w-full h-screen bg-no-repeat bg-cover bg-center flex flex-col justify-center items-center'>
        <ImSpinner8 className='text-5xl animate-spin text-white' />
      </div>
    )
  }

  let icon
  switch (data.weather[0].main) {
    case 'Haze':
      icon = <BsCloudHaze2Fill />
      break
    case 'Drizzle':
      icon = <BsCloudDrizzleFill className='text-[#31cafb]' />
      break
    case 'Clouds':
      icon = <IoMdCloudy />
      break
    case 'Rain':
      icon = <IoMdRainy className='text-[#31cafb]' />
      break
    case 'Snow':
      icon = <IoMdSnow className='text-[#31cafb]' />
      break
    case 'Clear':
      icon = <IoMdSunny className='text-[#ffde33]' />
      break
    case 'Thunderstorm':
      icon = <IoMdThunderstorm />
      break
  }

  const date = new Date()

  return (
    <div className='bg-bg w-full h-screen bg-center bg-cover bg-no-repeat flex flex-col justify-center items-center px-4 lg:px-0'>
      {errorMsg && <div className='absolute top-4 bg-yellow-300 text-[#3a5a40] font-semibold capitalize rounded-lg z-10 py-1 px-6'>{`${errorMsg.response.data.message}`}</div>}
      {/* FORM */}
      <form className={`${animate ? 'animate-shake' : 'animate-none'} h-16 bg-black/30 w-full max-w-[450px] rounded-full mb-4 mt-8 backdrop-blur-[32px]`}>
        <div className='relative h-full flex items-center justify-between p-2'>
          <input
            onChange={(e) => handleInput(e)}
            className='text-white placeholder:text-white text-[15px] font-light pl-6 h-full outline-none bg-transparent flex-1'
            type='text'
            placeholder='Search by city or country'
          />
          <button
            onClick={(e) => handleSubmit(e)}
            className='bg-[#588157] hover:bg-[#3a5a40] flex justify-center items-center transition w-16 h-9 rounded-full'
          >
            <IoMdSearch />
          </button>
        </div>
      </form>
      {/* CARD */}
      <div className='bg-black/20 w-full max-w-[450px] text-white min-h-[500px] rounded-[32px] pt-12 pb-8 px-6 backdrop-blur-sm mb-2'>
        {loading ? (
          <div className='w-full h-full flex justify-center items-center'>
            <ImSpinner8 className='text-white text-5xl animate-spin' />
          </div>
        ) : (
          <div>
            {/* CARD TOP */}
            <div className='flex items-center gap-x-5'>
              {/* ICON */}
              <div className='text-[88px]'>{icon}</div>
              <div>
                {/* COUNTRY NAME */}
                <div className='text-2xl font-semibold'>{data.name}, {data.sys.country}</div>
                {/* DATE */}
                <div>{date.getUTCDate()}/{date.getUTCMonth() + 1}/{date.getUTCFullYear()}</div>
              </div>
            </div>
            {/* CARD BODY */}
            <div className='my-8'>
              {/* TEMPERATURE */}
              <div className='flex justify-center items-center'>
                {/* TEMP */}
                <div className='text-[144px] leading-none font-light'>{parseInt(data.main.temp)}</div>
                {/* CELSIUS ICON */}
                <div className='text-4xl'><TbTemperatureCelsius /></div>
              </div>
              {/* WEATHER DESCRIPTION */}
              <div className='text-center capitalize'>{data.weather[0].description}</div>
            </div>
            {/* CARD BOTTOM */}
            <div className='max-w-[378px] mx-auto flex flex-col gap-y-6'>
              {/* LINE 1 */}
              <div className='flex justify-between'>
                {/* VISIBILITY */}
                <div className='flex items-center gap-x-2'>
                  {/* ICON */}
                  <div className='text-[20px]'>
                    <BsEye />
                  </div>
                  {/* VISIBILITY DATA*/}
                  <div>
                    Visibility{' '}
                    <span>{data.visibility / 1000} km</span>
                  </div>
                </div>
                {/* FEELS LIKE */}
                <div className='flex items-center gap-x-2'>
                  {/* ICON */}
                  <div className='text-[20px]'>
                    <BsThermometer />
                  </div>
                  {/* FEELS LIKE DATA*/}
                  <div className='flex'>
                    Feels like
                    <div className='flex ml-2'>
                      {parseInt(data.main.feels_like)}
                      <TbTemperatureCelsius />
                    </div>
                  </div>
                </div>
              </div>
              {/* LINE 2 */}
              <div className='flex justify-between'>
                {/* HUMIDITY */}
                <div className='flex items-center gap-x-2'>
                  {/* ICON */}
                  <div className='text-[20px]'>
                    <BsWater />
                  </div>
                  {/* HUMIDITY DATA*/}
                  <div>
                    Humidity
                    <span className='ml-2'>{data.main.humidity} %</span>
                  </div>
                </div>
                {/* WIND */}
                <div className='flex items-center gap-x-2'>
                  {/* ICON */}
                  <div className='text-[20px]'>
                    <BsWind />
                  </div>
                  {/* WIND DATA*/}
                  <div className='flex'>
                    Wind <span className='ml-2'>{data.wind.speed} m/s</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
        }
      </div>
    </div>
  )
}

export default App
