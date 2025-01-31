'use client';

import { useState } from 'react';
import Image from 'next/image';

import SearchManufacturer from './SearchManufacturer';
import { useRouter } from 'next/navigation';

const SearchButton = ({ otherClasses }: { otherClasses: string }) => (
    <button type="submit" className={`-ml-3 z-10 ${otherClasses}`}>
        <Image src='/magnifying-glass.svg' alt="mag glass" width={40} height={40} className='object-contain' />
    </button>
)
const SearchBar = () => {
    const [manufacturer, setManufacturer] = useState('');
    const [model, setModel] = useState('');
    const router = useRouter()

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(manufacturer === '' && model === '') {
            return alert("please fill in search bar")
        }

        updateSearchParams(model.toLowerCase(), manufacturer.toLowerCase())
    };

    const updateSearchParams = (model: string, manufacturer: string) => {
        const searchParams = new URLSearchParams(window.location.search);

        model ? searchParams.set('model', model) : searchParams.delete('model')

        manufacturer ? searchParams.set('manufacturer', manufacturer) : searchParams.delete('manufacturer')

        const newPathName = `${window.location.pathname}?${searchParams.toString()}`

        router.push(newPathName, { scroll: false })
    }

    return (
        <form className='searchbar' onSubmit={handleSearch}>
            <div className='searchbar__item'>
                <SearchManufacturer
                    manufacturer={manufacturer}
                    setManufacturer={setManufacturer}
                />

                <SearchButton otherClasses="sm:hidden" />
            </div>

            <div className='searchbar__item'>
                <Image
                    src="/model-icon.png"
                    width={25}
                    height={25}
                    className='absolute w-[20px] h-[20px] ml-4'
                    alt='car model'
                />
                <input 
                    type="text" 
                    name='model' 
                    value={model} 
                    onChange={(e) => setModel(e.target.value)}
                    placeholder='Tiguan'
                    className='searchbar__input'
                />
                <SearchButton otherClasses='sm:hidden' />
            </div>
            <SearchButton otherClasses='max-sm:hidden' />
        </form>
    )
}

export default SearchBar