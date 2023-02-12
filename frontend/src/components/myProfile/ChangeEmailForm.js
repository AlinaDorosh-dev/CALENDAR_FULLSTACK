import React from 'react'

const changeEmailForm = () => {
  return (
    <div>
              <h2>Change email</h2>
              <p>You logged with email: {loggedUser.email}</p>
              {success && (
                <p className={classes.success}>Email changed successfully</p>
              )}
              <form onSubmit={(e) => e.preventDefault()}>
                <label htmlFor='newEmail'>
                  <h4>New email:</h4>
                </label>
                <input
                  type='email'
                  name='newEmail'
                  id='newEmail'
                  onChange={(e) => {
                    setNewEmail(e.target.value);
                  }}
                />
                <div className={classes.btns}>
                  <button
                    type='button'
                    className={classes.cancel}
                    onClick={() => handleClose()}
                  >
                    Cancel{" "}
                  </button>
                  <button
                    type='submit'
                    disabled={!newEmail || !validEmail ? true : false}
                    onClick={patchUsersEmail}
                    className={
                      newEmail && validEmail ? classes.confirm : "disabled"
                    }
                  >
                    Confirm
                  </button>
                </div>
              </form>
            </div>
  )
}

export default changeEmailForm