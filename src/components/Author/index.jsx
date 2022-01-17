import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CountryDropdown } from 'react-country-region-selector'
import cx from 'classnames'
import BigNumber from 'bignumber.js'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import AuctionItem from '../explore/Auctions/AuctionItem'
import NFTItem from '../explore/ExploreAll/NFTItem'
// import CustomSelect from '../common/CustomSelect'

const Author = ({ address, name, description, collection, data, type, royalty, category, banner, title, metadata, editing, userInfo, subCategory, copies, userWallet, setName, setDescription, setCollection, setRoyalty, setCategory, setTitle, setEditing, setUserInfo, setCurrentSelCat, setGroup, setCopies, onFileChanged, onBannerChanged, create, onSubmit, onCancel, onChangePhoto }) => {
  const [copied, setCopied] = useState(false)
  const categories = [
    {
      name: 'Art',
      icon: 'icofont-vector-path'
    },
    {
      name: 'Music',
      icon: 'icofont-music-disk'
    },
    {
      name: 'Collectibles',
      icon: 'icofont-box'
    },
    {
      name: 'Cartoon',
      icon: 'icofont-movie'
    },
  ]
  const onCopy = () => {
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }
  return <section className='profile-section padding-top padding-bottom'>
    <div className='container-xl container-lg container-md container-sm' style={{ marginTop: -350 }}>
      <div className='section-wrapper'>
        <div className='member-profile'>
          <div className='profile-item'>
            <div className='profile-cover'>
              <img src='/assets/images/profile/cover.jpg' alt='cover-pic' />
            </div>
            <div className='profile-information'>
              <div className='profile-pic'>
                <img src={userInfo.photo || '/assets/images/profile/default.svg'} alt='DP' style={{ objectFit: 'contain' }} />
                <div className='custom-upload'>
                  <div className='file-btn'>
                    <span className='d-none d-lg-inline-block'> <i className='icofont-camera'></i>
                      Edit</span>
                    <span className='d-lg-none mr-0'><i className='icofont-plus'></i></span>
                  </div>
                  <input type='file' onChange={onChangePhoto} />
                </div>
              </div>
              <div className='profile-name'>
                <h4 style={{ marginBottom: '15px' }}>{(!!userInfo && !!userInfo.name) ? userInfo.name : 'Unknown Name'}</h4>
                <p></p>
              </div>
              <ul className='profile-contact'>
                <li className='crypto-copy'>
                  <div id='cryptoCode' className='crypto-page'>
                    <input id='cryptoLink' value={!!address ? `${address.substr(0, 8)}...${address.substr(address.length - 5, 5)}` : ''}
                      readOnly />
                    <div id='cryptoCopy' data-bs-toggle='tooltip' data-bs-placement='top'
                      title='Copy Address'>
                      <CopyToClipboard text={address}
                        onCopy={() => onCopy()}>
                        <span className='copy-icon'>
                          <i className={cx('icofont-ui-copy', { copied: copied })} aria-hidden='true'
                            data-copytarget='#cryptoLink'></i>
                        </span>
                      </CopyToClipboard>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className='profile-item d-none'>
            <div className='lab-inner'>
              <div className='lab-thumb'>
                <a href='replace'><img src='/assets/images/profile/Profile.jpg' alt='profile' /></a>
              </div>
              <div className='lab-content'>
                <div className='profile-name'>
                  <div className='p-name-content'>
                    <h4>William Smith</h4>
                    <p>Active 02 Minutes Ago</p>
                  </div>
                  <div className='contact-button'>
                    <button className='contact-btn'>
                      <i className='icofont-info-circle'></i>
                    </button>
                  </div>
                </div>
                <ul className='profile-contact'>
                  <li>
                    <a href='replace'>
                      <div className='icon'><i className='icofont-user'></i></div>
                      <div className='text'>
                        <p>Add Friends</p>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href='replace'>
                      <div className='icon'><i className='icofont-envelope'></i></div>
                      <div className='text'>
                        <p>Publice Message</p>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href='replace'>
                      <div className='icon'><i className='icofont-envelope'></i></div>
                      <div className='text'>
                        <p>Private Message</p>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className='profile-details'>
            <nav className='profile-nav'>
              <div className='nav nav-tabs' id='nav-tab' role='tablist'>
                <button className='nav-link active' id='nav-allNft-tab' data-bs-toggle='tab'
                  data-bs-target='#allNft' type='button' role='tab' aria-controls='allNft'>All NFT's</button>
                <button className='nav-link' id='nav-about-tab' data-bs-toggle='tab' data-bs-target='#about'
                  type='button' role='tab' aria-controls='about'>About</button>
              </div>
            </nav>
            <div className='tab-content' id='nav-tabContent'>
              <div className='tab-pane activity-page fade show active' id='allNft' role='tabpanel'>
                <div>
                  <div className='row'>
                    <div className='col-xl-12'>
                      <article>
                        <div className='activity-tab'>
                          <ul className='nav nav-pills mb-30 px-2' id='pills-tab' role='tablist'>
                            {
                              !userWallet && <li className='nav-item' role='presentation'>
                                <button className={cx('nav-link', { active: title === 'create' })}
                                  data-bs-toggle='pill' type='button' role='tab' aria-controls='pills-personal'
                                  onClick={() => setTitle('create')}>
                                  <i className='icofont-flask'></i>Create NFT</button>
                              </li>
                            }
                            <li className='nav-item' role='presentation'>
                              <button className={cx('nav-link', { active: title === 'sale' })}
                                data-bs-toggle='pill' type='button' aria-controls='pills-mentions'
                                onClick={() => setTitle('sale')}>
                                <i className='icofont-flash'></i>On Sale</button>
                            </li>
                            <li className='nav-item' role='presentation'>
                              <button className={cx('nav-link', { active: title === 'own' })}
                                data-bs-toggle='pill' type='button' role='tab' aria-controls='pills-favorites'
                                onClick={() => setTitle('own')}>
                                <i className='icofont-license'></i>Owning</button>
                            </li>
                            {/* <li className='nav-item' role='presentation'>
                              <button className={cx('nav-link', { active: title === 'createcollection' })}
                                data-bs-toggle='pill' type='button' role='tab' aria-controls='pills-favorites'
                                onClick={() => setTitle('createcollection')}>
                                <i className='icofont-license'></i>Create Collection</button>
                            </li>
                            <li className='nav-item' role='presentation'>
                              <button className={cx('nav-link', { active: title === 'collections' })}
                                data-bs-toggle='pill' type='button' role='tab' aria-controls='pills-favorites'
                                onClick={() => setTitle('collections')}>
                                <i className='icofont-license'></i>Collections</button>
                            </li> */}
                            {
                              (title === 'sale' || title === 'own') && <li className='custom-select'>
                                <select id="selectBox" onChange={e => {
                                  setGroup(e.target.value);
                                  setCurrentSelCat('All Categories');
                                }}>
                                  <option value='collection'>Collections</option>
                                  <option value='created'>Created</option>
                                </select>
                              </li>
                            }
                            {
                              (title === 'sale' || title === 'own') && <li className='custom-select' style={{ marginLeft: 0 }}>
                                <select id="selectBox1" onChange={e => setCurrentSelCat(e.target.value)}>
                                  {
                                    subCategory.map((cat, index) =>
                                      <option key={index} value={cat}>{cat}</option>
                                    )
                                  }
                                </select>
                              </li>
                            }
                          </ul>
                          <div className='tab-content activity-content' id='pills-tabContent'>
                            <div className='tab-pane' role='tabpanel' style={{ display: title === 'create' ? 'block' : 'none' }}>
                              <div className='row'>
                                <div className='col'>
                                  <div className='create-nft py-5 px-4'>
                                    <form className='create-nft-form'>
                                      <div className='upload-item mb-30'>
                                        {!data && <p>PNG,JPG,JPEG,SVG,WEBP,Mp3 & Mp4
                                          (Max-150mb)</p>}
                                        {!!data && type === 'image' && <img className='mb-3' style={{ width: '100%', height: 'auto' }} src={data} alt='no-content' />}
                                        {!!data && type === 'video' && <video className='mb-3' style={{ width: '100%', height: 'auto' }} src={data} alt='no-content' autoPlay />}
                                        {!!data && type === 'audio' && <audio className='mb-3' style={{ width: '100%' }} autoPlay controls >
                                          <source src={data} />
                                        </audio>}
                                        <div className='custom-upload'>
                                          <div className='file-btn'><i
                                            className='icofont-upload-alt'></i>
                                            Upload a file</div>
                                          <input type='file' onChange={onFileChanged} />
                                        </div>
                                      </div>
                                      {
                                        !!data && type !== 'image' && <div className='upload-item mb-30'>
                                          {!banner && <p>Choose Banner Image</p>}
                                          {!!banner && <img className='mb-3' style={{ width: '100%', height: 'auto' }} src={banner} alt='no-content' />}
                                          <div className='custom-upload'>
                                            <div className='file-btn'><i
                                              className='icofont-upload-alt'></i>
                                              Upload a file</div>
                                            <input type='file' onChange={e => onBannerChanged(e)} />
                                          </div>
                                        </div>
                                      }
                                      <div
                                        className='form-floating item-name-field mb-3'>
                                        <input type='text' className='form-control'
                                          id='itemNameInput'
                                          placeholder='Item Name'
                                          value={name}
                                          onChange={e => setName(e.target.value)} />
                                        <label htmlFor='itemNameInput'>Item
                                          Name</label>
                                      </div>
                                      <div
                                        className='form-floating item-desc-field mb-30'>
                                        <textarea className='form-control'
                                          placeholder='Item Description'
                                          id='itemDesc'
                                          value={description}
                                          onChange={e => setDescription(e.target.value)}></textarea>
                                        <label htmlFor='itemDesc'>Item
                                          Description</label>
                                      </div>
                                      <h4>Select Item Catergory</h4>
                                      <div className='row'>
                                        <div className='col-lg-6 col-md-12'>
                                          <div className='item-category-field mb-30'>
                                            <ul
                                              className='item-cat-list d-flex flex-wrap'>
                                              {
                                                categories.map(ctgr => <li key={ctgr.name} className={cx('item-cat-btn', { active: ctgr.name === category })} onClick={e => setCategory(ctgr.name)} style={{ height: '58px', display: 'flex', alignItems: 'center' }}>
                                                  <span><i
                                                    className={ctgr.icon}></i></span>
                                                  {ctgr.name}
                                                </li>)
                                              }
                                            </ul>
                                          </div>
                                        </div>
                                        {/* <div className='col-lg-6 col-md-12'>
                                          <CustomSelect label='Collections' options={[
                                            '',
                                            'Collection1',
                                            'Collection2',
                                            'OtherCollection'
                                          ]} value={collection} onChange={val => setCollection(val)} />
                                        </div> */}
                                      </div>
                                      <div className='item-price-field mb-3'>
                                        <div className='row g-3'>
                                          <div className='col-md-6 col-sm-12'>
                                            <div className='form-floating'>
                                              <input type='number'
                                                className='form-control'
                                                id='royalityInput'
                                                placeholder='Royalities'
                                                value={royalty}
                                                min={0}
                                                max={10}
                                                onChange={e => setRoyalty(e.target.value)} />
                                              <label
                                                htmlFor='royalityInput'>Royalities</label>
                                            </div>
                                          </div>
                                          <div className='col-md-6 col-sm-12'>
                                            <div className='form-floating'>
                                              <input type='number'
                                                className='form-control'
                                                id='royalityInput'
                                                placeholder='Numebr of Copies'
                                                value={copies}
                                                min={1}
                                                max={100}
                                                onChange={e => setCopies(e.target.value)} />
                                              <label
                                                htmlFor='royalityInput'>Number of Copies</label>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className='submit-btn-field text-center'>
                                        <button type='button' onClick={e => create()}>Create
                                          Item</button>
                                      </div>
                                    </form>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className='tab-pane' role='tabpanel' style={{ display: title === 'sale' ? 'block' : 'none' }}>
                              <div className='row justify-content-center gx-3 gy-2'>
                                {
                                  metadata.map((item, index) =>
                                    <div key={index} className='col-lg-3 col-sm-4'>
                                      {
                                        !!item.endAt ? <AuctionItem group={item.group} groupImage={item.groupImage} bidderImgs={['/assets/images/seller/05.png']} winnerImg='/assets/images/seller/05.gif' winnerName='' nftName={item.name} love={278} nftImg={item.image} contract={item.contract} tokenId={item.tokenId} endAt={item.endAt} price={`${BigNumber(item.price).dividedBy(BigNumber('1000000000000000000')).toFixed(0)} VET`} /> : <NFTItem group={item.group} groupImage={item.groupImage} bidderImgs={['/assets/images/seller/05.png']} winnerImg='/assets/images/seller/05.gif' winnerName='' nftName={item.name} love={278} nftImg={item.image} contract={item.contract} tokenId={item.tokenId} price={`${BigNumber(item.price).dividedBy(BigNumber('1000000000000000000')).toFixed(0)} VET`} />
                                      }
                                    </div>
                                  )
                                }
                                {
                                  metadata.length === 0 &&
                                  <div style={{ textAlign: 'center', fontSize: 20 }}>You don't have your NFTs on sale.</div>
                                }
                              </div>
                              {/* <LoadMore /> */}
                            </div>
                            <div className='tab-pane' id='pills-groups' role='tabpanel' style={{ display: title === 'own' ? 'block' : 'none' }}>
                              <div className='row justify-content-center gx-3 gy-2'>
                                {
                                  metadata.map((item, index) =>
                                    <div key={index} className='col-lg-3 col-sm-4'>
                                      {
                                        !!item.endAt ? <AuctionItem group={item.group} groupImage={item.groupImage} bidderImgs={['/assets/images/seller/05.png']} winnerImg='/assets/images/seller/05.gif' winnerName='' nftName={item.name} love={278} nftImg={item.image} contract={item.contract} tokenId={item.tokenId} endAt={item.endAt} /> : <NFTItem group={item.group} groupImage={item.groupImage} bidderImgs={['/assets/images/seller/05.png']} winnerImg='/assets/images/seller/05.gif' winnerName='' nftName={item.name} love={278} nftImg={item.image} contract={item.contract} tokenId={item.tokenId} />
                                      }
                                    </div>
                                  )
                                }
                                {
                                  metadata.length === 0 &&
                                  <div style={{ textAlign: 'center', fontSize: 20 }}>You don't have your own NFTs.</div>
                                }
                              </div>
                              {/* <LoadMore /> */}
                            </div>
                            <div className='tab-pane' role='tabpanel' style={{ display: title === 'createcollection' ? 'block' : 'none' }}>
                              <div className='row'>
                                <div className='col'>
                                  <div className='create-nft py-5 px-4'>
                                    <form className='create-nft-form'>
                                      <div className='upload-item mb-30'>
                                        {!data && <p>Logo Image</p>}
                                        {!!data && type === 'image' && <img className='mb-3' style={{ width: '100%', height: 'auto' }} src={data} alt='no-content' />}
                                        <div className='custom-upload'>
                                          <div className='file-btn'><i
                                            className='icofont-upload-alt'></i>
                                            Upload Logo</div>
                                          <input type='file' onChange={onFileChanged} />
                                        </div>
                                      </div>

                                      <div
                                        className='form-floating item-name-field mb-3'>
                                        <input type='text' className='form-control'
                                          id='itemNameInput'
                                          placeholder='Item Name'
                                          value={name}
                                          onChange={e => setName(e.target.value)} />
                                        <label htmlFor='itemNameInput'>Collection Name</label>
                                      </div>
                                      <div className='submit-btn-field text-center'>
                                        <button type='button' onClick={e => create()}>Create Collection</button>
                                      </div>
                                    </form>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className='tab-pane' id='pills-groups' role='tabpanel' style={{ display: title === 'collections' ? 'block' : 'none' }}>
                              <div className="row justify-content-center gx-3 gy-2">
                                <div className="col-lg-3 col-sm-4">
                                  <div className="nft-item">
                                    <div className="nft-inner">
                                      <div
                                        className="nft-item-top d-flex justify-content-between align-items-center">
                                        <div className="author-part">
                                          <ul className="author-list d-flex">
                                            <li className="single-author">
                                              <a href="author.html"><img
                                                src="assets/images/seller/02.png"
                                                alt="author-img" /></a>
                                            </li>
                                            <li
                                              className="single-author d-flex align-items-center">
                                              <a href="author.html"
                                                className="veryfied"><img
                                                  src="assets/images/seller/04.png"
                                                  alt="author-img" /></a>
                                              <h6><a href="author.html">Jhon
                                                Doe</a>
                                              </h6>
                                            </li>
                                          </ul>
                                        </div>
                                        <div className="more-part">
                                          <div className=" dropstart">
                                            <a className=" dropdown-toggle"
                                              href="#" role="button"
                                              data-bs-toggle="dropdown"
                                              aria-expanded="false"
                                              data-bs-offset="25,0">
                                              <i
                                                className="icofont-flikr"></i>
                                            </a>

                                            <ul className="dropdown-menu">
                                              <li><a className="dropdown-item"
                                                href="#"><span>
                                                  <i
                                                    className="icofont-warning"></i>
                                                </span> Report </a>
                                              </li>
                                              <li><a className="dropdown-item"
                                                href="#"><span><i
                                                  className="icofont-reply"></i></span>
                                                Share</a></li>
                                            </ul>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="nft-item-bottom">
                                        <div className="nft-thumb">
                                          <img src="assets/images/nft-item/03.gif"
                                            alt="nft-img" />
                                        </div>
                                        <div className="nft-content">
                                          <h4><a href="item-details.html">Walking
                                            On
                                            Air</a> </h4>
                                          <div
                                            className="price-like d-flex justify-content-between align-items-center">
                                            <p className="nft-price">Price:
                                              <span
                                                className="yellow-color">0.34
                                                ETH</span>
                                            </p>
                                            <a href="#"
                                              className="nft-like theme-color"><i
                                                className="icofont-heart"></i>
                                              230</a>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-3 col-sm-4">
                                  <div className="nft-item">
                                    <div className="nft-inner">
                                      <div
                                        className="nft-item-top d-flex justify-content-between align-items-center">
                                        <div className="author-part">
                                          <ul className="author-list d-flex">
                                            <li
                                              className="single-author d-flex align-items-center">
                                              <a href="author.html"
                                                className="veryfied"><img
                                                  src="assets/images/seller/04.gif"
                                                  alt="author-img" /></a>
                                              <h6><a href="author.html">Gucci
                                                Lucas</a></h6>
                                            </li>
                                          </ul>
                                        </div>
                                        <div className="more-part">
                                          <div className=" dropstart">
                                            <a className=" dropdown-toggle"
                                              href="#" role="button"
                                              data-bs-toggle="dropdown"
                                              aria-expanded="false"
                                              data-bs-offset="25,0">
                                              <i
                                                className="icofont-flikr"></i>
                                            </a>

                                            <ul className="dropdown-menu">
                                              <li><a className="dropdown-item"
                                                href="#"><span>
                                                  <i
                                                    className="icofont-warning"></i>
                                                </span> Report </a>
                                              </li>
                                              <li><a className="dropdown-item"
                                                href="#"><span><i
                                                  className="icofont-reply"></i></span>
                                                Share</a></li>
                                            </ul>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="nft-item-bottom">
                                        <div className="nft-thumb">
                                          <img src="assets/images/nft-item/07.jpg"
                                            alt="nft-img" />
                                        </div>
                                        <div className="nft-content">
                                          <h4><a href="item-details.html">EUPHORIA
                                            de</a>
                                          </h4>
                                          <div
                                            className="price-like d-flex justify-content-between align-items-center">
                                            <p className="nft-price">Price:
                                              <span
                                                className="yellow-color">0.34
                                                ETH</span>
                                            </p>
                                            <a href="#"
                                              className="nft-like theme-color"><i
                                                className="icofont-heart"></i>
                                              230</a>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-3 col-sm-4">
                                  <div className="nft-item">
                                    <div className="nft-inner">
                                      <div
                                        className="nft-item-top d-flex justify-content-between align-items-center">
                                        <div className="author-part">
                                          <ul className="author-list d-flex">
                                            <li className="single-author">
                                              <a href="author.html"><img
                                                src="assets/images/seller/05.png"
                                                alt="author-img" /></a>
                                            </li>
                                            <li className="single-author">
                                              <a href="author.html"><img
                                                src="assets/images/seller/02.png"
                                                alt="author-img" /></a>
                                            </li>
                                            <li
                                              className="single-author d-flex align-items-center">
                                              <a href="author.html"
                                                className="veryfied"><img
                                                  src="assets/images/seller/05.gif"
                                                  alt="author-img" /></a>
                                              <h6><a href="author.html">Ecalo
                                                jers</a></h6>
                                            </li>
                                          </ul>
                                        </div>
                                        <div className="more-part">
                                          <div className=" dropstart">
                                            <a className=" dropdown-toggle"
                                              href="#" role="button"
                                              data-bs-toggle="dropdown"
                                              aria-expanded="false"
                                              data-bs-offset="25,0">
                                              <i
                                                className="icofont-flikr"></i>
                                            </a>

                                            <ul className="dropdown-menu">
                                              <li><a className="dropdown-item"
                                                href="#"><span>
                                                  <i
                                                    className="icofont-warning"></i>
                                                </span> Report </a>
                                              </li>
                                              <li><a className="dropdown-item"
                                                href="#"><span><i
                                                  className="icofont-reply"></i></span>
                                                Share</a></li>
                                            </ul>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="nft-item-bottom">
                                        <div className="nft-thumb">
                                          <img src="assets/images/nft-item/06.gif"
                                            alt="nft-img" />
                                        </div>
                                        <div className="nft-content">
                                          <h4><a href="item-details.html">Mewao
                                            com de</a>
                                          </h4>
                                          <div
                                            className="price-like d-flex justify-content-between align-items-center">
                                            <p className="nft-price">Price:
                                              <span
                                                className="yellow-color">0.34
                                                ETH</span>
                                            </p>
                                            <a href="#"
                                              className="nft-like theme-color"><i
                                                className="icofont-heart"></i>
                                              278</a>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-3 col-sm-4">
                                  <div className="nft-item">
                                    <div className="nft-inner">
                                      <div
                                        className="nft-item-top d-flex justify-content-between align-items-center">
                                        <div className="author-part">
                                          <ul className="author-list d-flex">
                                            <li className="single-author">
                                              <a href="author.html"><img
                                                src="assets/images/seller/02.gif"
                                                alt="author-img" /></a>
                                            </li>
                                            <li className="single-author">
                                              <a href="author.html"><img
                                                src="assets/images/seller/07.png"
                                                alt="author-img" /></a>
                                            </li>
                                            <li
                                              className="single-author d-flex align-items-center">
                                              <a href="author.html"
                                                className="veryfied"><img
                                                  src="assets/images/seller/01.png"
                                                  alt="author-img" /></a>
                                              <h6><a href="author.html">Hola
                                                moc</a>
                                              </h6>
                                            </li>
                                          </ul>
                                        </div>
                                        <div className="more-part">
                                          <div className=" dropstart">
                                            <a className=" dropdown-toggle"
                                              href="#" role="button"
                                              data-bs-toggle="dropdown"
                                              aria-expanded="false"
                                              data-bs-offset="25,0">
                                              <i
                                                className="icofont-flikr"></i>
                                            </a>

                                            <ul className="dropdown-menu">
                                              <li><a className="dropdown-item"
                                                href="#"><span>
                                                  <i
                                                    className="icofont-warning"></i>
                                                </span> Report </a>
                                              </li>
                                              <li><a className="dropdown-item"
                                                href="#"><span><i
                                                  className="icofont-reply"></i></span>
                                                Share</a></li>
                                            </ul>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="nft-item-bottom">
                                        <div className="nft-thumb">
                                          <img src="assets/images/nft-item/04.jpg"
                                            alt="nft-img" />
                                        </div>
                                        <div className="nft-content">
                                          <h4><a href="item-details.html">pet
                                            mice rio</a>
                                          </h4>
                                          <div
                                            className="price-like d-flex justify-content-between align-items-center">
                                            <p className="nft-price">Price:
                                              <span
                                                className="yellow-color">0.34
                                                ETH</span>
                                            </p>
                                            <a href="#"
                                              className="nft-like theme-color"><i
                                                className="icofont-heart"></i>
                                              340</a>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-3 col-sm-4">
                                  <div className="nft-item">
                                    <div className="nft-inner">
                                      <div
                                        className="nft-item-top d-flex justify-content-between align-items-center">
                                        <div className="author-part">
                                          <ul className="author-list d-flex">
                                            <li className="single-author">
                                              <a href="author.html"><img
                                                src="assets/images/seller/03.png"
                                                alt="author-img" /></a>
                                            </li>
                                            <li
                                              className="single-author d-flex align-items-center">
                                              <a href="author.html"
                                                className="veryfied"><img
                                                  src="assets/images/seller/04.png"
                                                  alt="author-img" /></a>
                                              <h6><a href="author.html">Logicto
                                                pen</a></h6>
                                            </li>
                                          </ul>
                                        </div>
                                        <div className="more-part">
                                          <div className=" dropstart">
                                            <a className=" dropdown-toggle"
                                              href="#" role="button"
                                              data-bs-toggle="dropdown"
                                              aria-expanded="false"
                                              data-bs-offset="25,0">
                                              <i
                                                className="icofont-flikr"></i>
                                            </a>

                                            <ul className="dropdown-menu">
                                              <li><a className="dropdown-item"
                                                href="#"><span>
                                                  <i
                                                    className="icofont-warning"></i>
                                                </span> Report </a>
                                              </li>
                                              <li><a className="dropdown-item"
                                                href="#"><span><i
                                                  className="icofont-reply"></i></span>
                                                Share</a></li>
                                            </ul>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="nft-item-bottom">
                                        <div className="nft-thumb">
                                          <img src="assets/images/nft-item/05.gif"
                                            alt="nft-img" />
                                        </div>
                                        <div className="nft-content">
                                          <h4><a href="item-details.html">Logical
                                            Impact </a>
                                          </h4>
                                          <div
                                            className="price-like d-flex justify-content-between align-items-center">
                                            <p className="nft-price">Price:
                                              <span
                                                className="yellow-color">0.34
                                                ETH</span>
                                            </p>
                                            <a href="#"
                                              className="nft-like theme-color"><i
                                                className="icofont-heart"></i>
                                              330</a>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </article>
                    </div>
                  </div>
                </div>
              </div>
              <div className='tab-pane fade' id='about' role='tabpanel' aria-labelledby='nav-about-tab'>
                <div>
                  <div className='row'>
                    <div className='col-xl-12'>
                      <article>
                        <div className='info-card mb-3'>
                          <div className='info-card-title'>
                            <h4>About</h4>
                          </div>
                          <div className='info-card-content' style={{ background: 'inherit' }}>
                            {
                              editing ? <div className='create-nft py-2 px-4'>
                                <form className='create-nft-form'>
                                  <textarea className='form-control'
                                    id='itemNameInput'
                                    placeholder='About'
                                    value={userInfo.about}
                                    style={{ height: '100px' }}
                                    onChange={e => setUserInfo({ ...userInfo, about: e.target.value })} /></form></div> : <p>{userInfo.about}</p>
                            }
                          </div>
                        </div>
                        <div className='info-card'>
                          <div className='info-card-title'>
                            <h4>Other Info</h4>
                          </div>
                          <div className='info-card-content' style={{ background: 'inherit' }}>
                            {
                              editing ? <div className='create-nft py-3 px-4'>
                                <form className='create-nft-form'>
                                  <div className='row'>
                                    <div className='col-md-6 col-sm-12'>
                                      <div
                                        className='form-floating item-name-field mb-3'>
                                        <input type='text' className='form-control'
                                          id='itemNameInput'
                                          placeholder='Item Name'
                                          value={userInfo.name}
                                          onChange={e => setUserInfo({ ...userInfo, name: e.target.value })} />
                                        <label htmlFor='itemNameInput'>Name</label>
                                      </div>
                                    </div>
                                    <div className='col-md-6 col-sm-12'>
                                      <div
                                        className='form-floating item-desc-field mb-3'>
                                        <CountryDropdown
                                          className='form-control'
                                          value={userInfo.country}
                                          onChange={val => setUserInfo({ ...userInfo, country: val })} />
                                        <label htmlFor='itemDesc'>Country</label>
                                      </div>
                                    </div>
                                  </div>
                                  <div className='row'>
                                    <div className='col-md-6 col-sm-12'>
                                      <div
                                        className='form-floating item-desc-field mb-3'>
                                        <input type='text' className='form-control'
                                          id='itemNameInput'
                                          placeholder='Item Name'
                                          value={userInfo.specialize}
                                          onChange={e => setUserInfo({ ...userInfo, specialize: e.target.value })} />
                                        <label htmlFor='itemDesc'>Specialized in</label>
                                      </div>
                                    </div>
                                    <div className='col-md-6 col-sm-12'>
                                      <div
                                        className='form-floating item-desc-field mb-3'>
                                        <input type='text' className='form-control'
                                          id='itemNameInput'
                                          placeholder='Item Name'
                                          disabled
                                          value={address}
                                        />
                                        <label htmlFor='itemDesc'>Wallet Address</label>
                                      </div>
                                    </div>
                                  </div>
                                  <div className='row'>
                                    <div className='col-md-6 col-sm-12'>
                                      <div
                                        className='form-floating item-desc-field mb-3'>
                                        <input type='date' className='form-control'
                                          id='itemNameInput'
                                          placeholder='Item Name'
                                          value={userInfo.birthday}
                                          onChange={e => setUserInfo({ ...userInfo, birthday: e.target.value })} />
                                        <label htmlFor='itemDesc'>Date of Birth</label>
                                      </div>
                                    </div>
                                    <div className='col-md-6 col-sm-12'>
                                      <div
                                        className='form-floating item-desc-field mb-3'>
                                        <input type='text' className='form-control'
                                          id='itemNameInput'
                                          placeholder='Item Name'
                                          value={userInfo.address}
                                          onChange={e => setUserInfo({ ...userInfo, address: e.target.value })} />
                                        <label htmlFor='itemDesc'>Address</label>
                                      </div>
                                    </div>
                                  </div>
                                  <div className='row' style={{ justifyContent: 'center' }}>
                                    <div className='submit-btn-field text-center' style={{ width: 'auto' }}>
                                      <button type='button' onClick={e => onSubmit()}>Submit</button>
                                    </div>
                                    <div className='submit-btn-field text-center' style={{ width: 'auto' }}>
                                      <button type='button' onClick={e => onCancel()}>Cancel</button>
                                    </div>
                                  </div>
                                </form>
                              </div> : <div className='create-nft' style={{ background: 'inherit' }}><ul className='info-list'>
                                <li>
                                  <p className='info-name'>Name</p>
                                  <p className='info-details'>{userInfo.name}</p>
                                </li>
                                <li>
                                  <p className='info-name'>Country</p>
                                  <p className='info-details'>{userInfo.country}</p>
                                </li>
                                <li>
                                  <p className='info-name'>Specialize in</p>
                                  <p className='info-details'>{userInfo.specialize}</p>
                                </li>
                                <li>
                                  <p className='info-name'>Wallet Address</p>
                                  <p className='info-details'>{address}</p>
                                </li>
                                <li>
                                  <p className='info-name'>Date of Birth</p>
                                  <p className='info-details'>{userInfo.birthday}</p>
                                </li>
                                <li>
                                  <p className='info-name'>Address</p>
                                  <p className='info-details'>{userInfo.address}</p>
                                </li>
                                {
                                  !userWallet && <div className='submit-btn-field text-center'>
                                    <button type='button' onClick={e => setEditing(true)}>Edit</button>
                                  </div>
                                }
                              </ul>
                              </div>
                            }
                          </div>
                        </div>
                      </article>
                    </div>
                  </div>
                </div>
              </div>
              <div className='tab-pane fade' id='wallet' role='tabpanel' aria-labelledby='nav-wallet-tab'>
                <div>
                  <div className='row'>
                    <div className='col-xl-12'>
                      <div className='wallet-wrapper'>
                        <div className='wallet-title'>
                          <h4>Connect your wallet</h4>
                          <p>Connect with one of available wallet providers or <Link
                            to='/signup'>create a
                            new wallet</Link></p>
                        </div>
                        <div className='col-lg-4 col-md-6'>
                          <div className='wallet-item'>
                            <div className='wallet-item-inner'>
                              <div className='wallet-thumb'>
                                <Link to='/signin'>
                                  <img src='/assets/images/wallet/Sync2.jpg'
                                    alt='wallet-img' />
                                </Link>
                              </div>
                              <div className='wallet-content'>
                                <h5><Link to='/signin'>Sync2
                                  wallet</Link></h5>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className='col-lg-4 col-md-6 mt-2'>
                          <div className='wallet-item'>
                            <div className='wallet-item-inner'>
                              <div className='wallet-thumb'>
                                <Link to='/signin'>
                                  <img src='/assets/images/wallet/VeThor.jpg'
                                    alt='wallet-img' />
                                </Link>
                              </div>
                              <div className='wallet-content'>
                                <h5><Link to='/signin'>VeChainThor
                                  Wallet</Link></h5>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <p className='mt-5 wallet-notice'><span className='me-1 theme-color'><i
                        className='icofont-bulb-alt'></i></span> We
                        do not own your private keys and cannot access
                        your funds
                        without your confirmation.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
}

export default Author