import React, { useContext, useEffect, useRef, useState } from 'react'

import styles from './Dashboard.module.css'
import { format } from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpAZ, faArrowUpZA, faCamera, faCheck, faEye, faFloppyDisk, faMagnifyingGlass, faPenToSquare, faTrash, faUser, faUserPlus, faXmark } from '@fortawesome/free-solid-svg-icons'
import { Context } from '../../../store/Provider'
import { actions } from '../../../store'
const Dashboard = () => {
  const [isAddStudent, setAddStudent] = useState(false)
  const [isViewStudent, setViewStudent] = useState(false)
  const [isDeleteConfirm, setDeleteConfirm] = useState(false)
  const [isUpdateStudent, setUpdateStudent] = useState(false)
  const [deleteSuccess, setDeleteSuccess] = useState(false)
  const [addSuccess, setAddSuccess] = useState(false);
  const [selectedRowIndex, setSelectedRowIndex] = useState(-1)
  const [selectedFullName, setSelectedFullName] = useState('')
  const [selectedHometown, setSelectedHometown] = useState('')
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedField, setSelectedField] = useState('')
  const [selectedImage, setSelectedImage] = useState('')
  const [deleteName, setDeleteName] = useState('')
  const [avatar, setAvatar] = useState('')
  const [sort, setSort] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState(false)

  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  useEffect(() => {
      return() => {
        avatar && URL.revokeObjectURL(avatar)
      }
  },[avatar])
  

  const handlePreviewAvatar = (e:any) => {
    const file = e.target.files[0]
    file.preview = URL.createObjectURL(file);
    setAvatar(file.preview);
    dispatch(actions.setImageInput(file.preview))
  } 

  const updateImage = (e:any) => {
    const file = e.target.files[0]
    file.preview = URL.createObjectURL(file);
    setSelectedImage(file.preview)
  }


  const contextValue = useContext(Context)
  if (!contextValue) {
    return null;
  }
  const [state, dispatch] = contextValue;
  const { image, fullname, hometown, field, dateOfBirth, student } = state

  const selectedStudent = student[selectedRowIndex]

  const openModal = () => {
    setAddStudent(true);
  };

  const closeModal = () => {
    setAddStudent(false);
    setViewStudent(false);
    setUpdateStudent(false);
    setDeleteConfirm(false);
  };
  
  const handleAdd = async (e:any) => {
    e.preventDefault()
    await dispatch(actions.addStudent({image, fullname, hometown, field, dateOfBirth}))
    setAddStudent(false);
    timeoutRef.current = setTimeout(() => {
      setAddSuccess(true);
    }, 10);
  }

  const handleUpdate = async (e:any) => {
    e.preventDefault()
    dispatch(actions.updateStudent({image:selectedImage, index: selectedRowIndex, fullname: selectedFullName, hometown: selectedHometown, field: selectedField, dateOfBirth: selectedDate}))
  }

  const handleDelete = async(e:any) => {
    e.preventDefault()
    await dispatch(actions.deleteStudent(selectedRowIndex));
    setDeleteConfirm(false);
    timeoutRef.current = setTimeout(() => {
      setDeleteSuccess(true);
    }, 10);
  }

  setTimeout(() => {
    if(timeoutRef.current !== null){
      clearTimeout(timeoutRef.current)
      setDeleteSuccess(false);
    }
  }, 6000)

  setTimeout(() => {
    if(timeoutRef.current !== null){
      clearTimeout(timeoutRef.current)
      setAddSuccess(false);
    }
  }, 7000)

  const handleSortName = () => {
    setFilter(false)
    if(sort === false) {
      setSort(true);
    }else{
      setSort(false);
    }
  }
  
  const handleSearch = () => {
    setFilter(true)
  }
  
  const filteredData = student.filter((item:any) =>
    item.fullname.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div id={styles.dashboard}>

        <div className={styles.studentTable}>
          <div className={styles.tableHeading}>
            <div className={styles.searchBox}>
              <input type="text" 
                    placeholder='Tìm kiếm..' 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}/>
              <button onClick={handleSearch} className={styles.searchIcon}><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
            </div>

            <button onClick={openModal} className={styles.addBtn}>
              <FontAwesomeIcon icon={faUserPlus} />
              <span>Thêm mới</span>
            </button>
          </div>
          <table>
              <thead>
                  <tr>
                    <th></th>
                    <th onClick={handleSortName}>
                      <span>Tên sinh viên</span>
                      {sort ? (<FontAwesomeIcon icon={faArrowUpAZ} />) : <FontAwesomeIcon icon={faArrowUpZA} />}
                    </th>
                    <th>Quê quán</th>
                    <th>Ngành học</th>
                    <th>Ngày sinh</th>
                    <th></th>
                  </tr>
              </thead>

              {(filter ? filteredData : 
                        (sort ? student.sort((a, b) => a.fullname.localeCompare(b.fullname)) : 
                        student.sort((b, a) => a.fullname.localeCompare(b.fullname)))).map((std,index) => (
                <>
                <tbody>
                  <tr>
                    <td key={`${std.image}-${index}`}><img src={std.image} alt="" width="80" /></td>
                    <td key={`${std.fullname}-${index}`}>{std.fullname}</td>
                    <td key={`${std.hometown}-${index}`}>{std.hometown}</td>
                    <td key={`${std.field}-${index}`}>{std.field}</td>
                    <td key={`${std.dateOfBirth}-${index}`}>{format(std.dateOfBirth, 'dd/MM/yyyy')}</td>
                    <td className={styles.btns} key={index}>
                        <button className={styles.updateBtn} onClick={() => {
                          setViewStudent(true)
                          setSelectedRowIndex(index)
                        }}>
                          <FontAwesomeIcon icon={faEye} />
                          <span>Xem</span>
                        </button>
                        <button className={styles.removeBtn} onClick={() => {
                          setSelectedRowIndex(index)
                          setDeleteConfirm(true)
                          setDeleteName(std.fullname)
                          
                        }}>
                          <FontAwesomeIcon icon={faTrash} />
                          <span>Xóa</span>
                        </button>
                    </td>
                  </tr>
                </tbody>
                </>
              ))}

          </table>
        </div>

        <div>
          {isAddStudent && (
            <div className={styles.modalOverlay} onSubmit={handleAdd}>
              <form className={styles.modal}>
                <span className={styles.close} onClick={closeModal}>&times;</span>
                <h3>Thêm sinh viên</h3>
                <div className={styles.avatar}>
                  <img className={styles.avatarBox} src={avatar} alt="" />
                  <br />
                  <input type="file" className={styles.avatarFile} onChange={handlePreviewAvatar} aria-label="File browser example" accept="image/*" />
                  <span className={styles.camera}><FontAwesomeIcon icon={faCamera} /></span>
                  <span className={styles.userIcon}><FontAwesomeIcon icon={faUser} /></span>
                </div>
                <div className={styles.groupControl}>
                    <label>Họ và tên</label><br />
                    <input 
                      required
                      value={fullname}
                      onChange={(e) => dispatch(actions.setFullnameInput(e.target.value))}
                    />
                </div>
            
                <div className={styles.groupControl}>
                  <label>Quê quán</label><br />
                  <input 
                    value={hometown}
                    required
                    onChange={(e) => dispatch(actions.setHometownInput(e.target.value))}
                  />
                </div>

                <div className={styles.groupControl}>
                  <label>Ngành học</label><br />
                  <input 
                    value={field}
                    required
                    onChange={(e) => dispatch(actions.setFieldInput(e.target.value))}
                  />
                </div>
           
                <div className={styles.groupControl}>
                  <label>Ngày sinh</label><br />
                  <input 
                    type='date'
                    required
                    onChange={(e) => dispatch(actions.setDayOfBirthInput(new Date(e.target.value)))}
                  />
                </div>
                
                <button className={styles.modalAddBtn}>
                  <FontAwesomeIcon icon={faFloppyDisk} />
                  <span>Lưu</span>
                </button>
              </form>
            </div>
          )}
        </div>

        <div>
          {isViewStudent && (
            <div className={styles.modalOverlay}>
              <div className={styles.modal}>
                <span className={styles.close} onClick={closeModal}>&times;</span>
                <h3>Xem thông tin</h3>
                  <span>
                    <div className={styles.viewImage}>
                        <img src={selectedStudent['image']} alt="" width="120" height="120" />
                    </div> 
                    <div className={styles.groupControl}>
                      <label>Họ và tên</label><br />
                      <input 
                        disabled
                        value={selectedStudent['fullname']}
                      />
                    </div>

                    <div className={styles.groupControl}>
                      <label>Quê quán</label><br />
                      <input 
                        disabled
                        value={selectedStudent['hometown']}
                      />
                    </div>

                    <div className={styles.groupControl}>
                      <label>Ngành học</label><br />
                      <input 
                        disabled
                        value={selectedStudent['field']}
                      />
                    </div>

                    <div className={styles.groupControl}>
                      <label>Ngày sinh</label><br />
                      <input 
                        disabled
                        value={format(selectedStudent['dateOfBirth'].toLocaleDateString(), "dd/MM/yyyy")}
                      />
                    </div>
                  </span>

                  <div className={styles.viewBtns}>
                    <button className={styles.modalCancelBtn} onClick={closeModal}>
                      <FontAwesomeIcon icon={faXmark} />
                      <span>Hủy</span>
                    </button>

                    <button className={styles.modalUpdateBtn} onClick={() => {
                      setUpdateStudent(true)
                      setViewStudent(false)
                      setSelectedFullName(selectedStudent['fullname'])
                      setSelectedHometown(selectedStudent['hometown'])
                      setSelectedField(selectedStudent['field'])
                      setSelectedDate(selectedStudent['dateOfBirth'])
                      setSelectedImage(selectedStudent['image'])
                    }}>
                        <FontAwesomeIcon icon={faPenToSquare} />
                        <span>Sửa</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
        </div>

        <div>
          {isUpdateStudent && (
            <div className={styles.modalOverlay}>
              <form className={styles.modal} onSubmit={handleUpdate}>
                <span className={styles.close} onClick={closeModal}>&times;</span>
                <h3>Cập nhật thông tin</h3>
        
                  <span>
                    <div className={styles.updateImage}>
                        <img src={selectedImage} alt="" width="120" height="120" />
                        <input type="file" className={styles.updateImageFile} onChange={updateImage}/>
                        <span className={styles.updateCamera}><FontAwesomeIcon icon={faCamera} /></span>
                    </div>
                    <div className={styles.groupControl}>
                      <label>Họ và tên</label><br />
                      <input 
                        type="text"
                        placeholder={selectedFullName}
                        onChange={(e) => setSelectedFullName(e.target.value)}
                      />
                    </div>

                    <div className={styles.groupControl}>
                      <label>Quê quán</label><br />
                      <input 
                        placeholder={selectedHometown}
                        type="text"
                        onChange={(e) => setSelectedHometown(e.target.value)}
                      />
                    </div>

                    <div className={styles.groupControl}>
                      <label>Ngành học</label><br />
                      <input 
                        placeholder={selectedField}
                        type="text"
                        onChange={(e) => setSelectedField(e.target.value)}
                      />
                    </div>
                    
                    <div className={styles.groupControl}>
                      <label>Ngày sinh</label><br />
                      <input 
                        type="date"
                        onChange={(e) => 
                            setSelectedDate(new Date(e.target.value))
                        }
                      />
                    </div>
                  </span>

                  <div className={styles.viewBtns}>
                    <button className={styles.modalCancelBtn} onClick={closeModal}>
                      <FontAwesomeIcon icon={faXmark} />
                      <span>Hủy</span>
                    </button>

                    <button className={styles.modalUpdateBtn} onClick={() => {setUpdateStudent(true)}}>
                        <FontAwesomeIcon icon={faPenToSquare} />
                        <span>Cập nhật</span>
                    </button>
                  </div>
                </form>
              </div>
            )}
        </div>
        
        {isDeleteConfirm && (
            <div className={styles.modalOverlay}>
              <form className={styles.deleteModal}>
                  <h3>Bạn có chắc chắn muốn xóa sinh viên <i>{deleteName}</i> ?</h3>
                  <div className={styles.deleteBtns}>
                    <button className={styles.removeBtn} onClick={handleDelete}>
                        <FontAwesomeIcon icon={faTrash} />
                        <span>Xóa</span>
                    </button>
                    <button className={styles.cancelBtn} onClick={closeModal}>
                      <FontAwesomeIcon icon={faXmark} />
                      <span>Hủy</span>
                    </button>
                  </div>
              </form>
            </div>
          )}


        {(deleteSuccess || addSuccess)  && (
          <form className={styles.deleteSuccess}>
            <div>
              <span><FontAwesomeIcon icon={faCheck} /></span>
              {deleteSuccess && <p className={styles.deleteText}>Sinh viên <i>{deleteName}</i> đã được xóa</p>}
              {addSuccess &&  <p className={styles.addText}>Sinh viên <i>{fullname}</i> đã được thêm thành công</p>}
            </div>
          </form>
            
          )}  
    </div>

  )
}

export default Dashboard
