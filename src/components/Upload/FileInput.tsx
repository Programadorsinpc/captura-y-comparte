interface FileInputProps {
    onFileChange: (file: File | null) => void;
  }
  
  const FileInput = ({ onFileChange }: FileInputProps) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        onFileChange(e.target.files[0]);
      }
    };
  
    return (
      <div className="flex flex-col items-center">
        <input
          type="file"
          onChange={handleChange}
          className="text-gray-700 bg-white border border-gray-300 rounded-md cursor-pointer py-2 px-4"
        />
      </div>
    );
  };
  
  export default FileInput;
  