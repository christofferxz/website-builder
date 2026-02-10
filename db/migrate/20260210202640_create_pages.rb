class CreatePages < ActiveRecord::Migration[7.0]
  def change
    create_table :pages do |t|
      t.string :name, null: false
      t.json :document

      t.timestamps
    end
  end
end
