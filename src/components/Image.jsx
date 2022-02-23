import React from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import AWS from 'aws-sdk';

const WritePage = props => {
	const [progress, setProgress] = useState(0);
	const [imageSrc, setImageSrc] = useState('');
	const [selectedFile, setSelectedFile] = useState(null);

	// AWS S3 연결을 위한 변수 할당
	const S3_BUCKET = 'my-magazine-shine7329';
	const ACCESS_KEY = process.env.REACT_APP_AWSAccessKeyId;
	const SECRET_ACCESS_KEY = process.env.REACT_APP_AWSSecretKey;
	const REGION = 'ap-northeast-2';

	// AWS config 설정
	AWS.config.update({
		accessKeyId: ACCESS_KEY,
		secretAccessKey: SECRET_ACCESS_KEY,
	});

	// AWS S3 버킷 정보 설정
	const myBucket = new AWS.S3({
		params: { Bucket: S3_BUCKET },
		region: REGION,
	});

	// input type file 관리
	const handleFileInput = e => {
		const file = e.target.files[0];
		if (!(file.type === 'image/jpeg' || file.type === 'image/png')) {
			if (file.size > 3000000) {
				alert('3mb 이하 이미지만 업로드 가능합니다.');
			}
			alert('png, jpg 파일만 Upload 가능합니다.');
			return;
		}
		setProgress(0);
		setSelectedFile(file);
		encodeFileToBase64(file);
	};

	// 미리보기 이미지를 위해 인코딩 함수 구현
	const encodeFileToBase64 = fileBlob => {
		const reader = new FileReader();
		reader.readAsDataURL(fileBlob);
		return new Promise(resolve => {
			reader.onload = () => {
				setImageSrc(reader.result);
				resolve();
			};
		});
	};

	// S3 에 업로드 함수 구현
	const uploadFile = file => {
		const params = {
			ACL: 'public-read',
			Body: file,
			Bucket: S3_BUCKET,
			Key: 'upload/' + file.name,
		};

		myBucket
			.putObject(params)
			.on('httpUploadProgress', (evt, res) => {
				setProgress(Math.round((evt.loaded / evt.total) * 100));
				props.setUrl(
					'https://my-magazine-shine7329.s3.ap-northeast-2.amazonaws.com' +
						res.request.httpRequest.path
				);
			})
			.send(err => {
				if (err) console.log(err);
			});
	};

	return (
		<>
			<WriteWrapper>
				<div className='upload-btn'>
					<label htmlFor='inputFile'>사진선택</label>
					<input id='inputFile' type='file' onChange={handleFileInput} />
				</div>
				<div className='img-box'>
					{imageSrc && <img src={imageSrc} alt='preview-img' />}
				</div>
				{progress ? `${progress}% 완료` : '업로드 해주세요'}
				<button
					id='writeBtn'
					className='write-btn'
					type='submit'
					onClick={() => {
						uploadFile(selectedFile);
					}}
				>
					업로드
				</button>
			</WriteWrapper>
		</>
	);
};

const WriteWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	font-size: 1.4rem;
	gap: 2rem;
	margin: 3rem;
	.upload-btn {
		label {
			display: inline-block;
			padding: 0.5em 0.75em;
			color: #fff;
			font-size: inherit;
			line-height: normal;
			vertical-align: middle;
			background-color: #999;
			cursor: pointer;
			border-radius: 5px;
			border-radius: 0.25em;
		}
		input {
			position: absolute;
			width: 1px;
			height: 1px;
			padding: 0;
			margin: -1px;
			overflow: hidden;
			clip: rect(0, 0, 0, 0);
			border: 0;
		}
	}
	.img-box {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 50%;
		/* border: 1px solid #000; */
		img {
			width: 100%;
		}
	}
	textarea {
		resize: none;
	}
	.write-btn {
		width: 300px;
		margin: 20px 30px;
		padding: 15px 10px;
		text-align: center;
		background-color: #999;
		border: none;
		color: #fff;
		border-radius: 5px;
		font-size: 1.6rem;
	}
`;

export default WritePage;
